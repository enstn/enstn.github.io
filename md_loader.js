import MarkdownIt from 'https://cdn.jsdelivr.net/npm/markdown-it@13.0.1/+esm';

// Initialize markdown-it with options
const md = new MarkdownIt({
    html: true,        // Enable HTML tags in source
    breaks: true,      // Convert '\n' in paragraphs into <br>
    linkify: true,     // Autoconvert URL-like text to links
    typographer: true  // Enable some language-neutral replacement + quotes beautification
});

// Custom plugin for text highlighting
md.use((md) => {
    // Add '==' as a new tokenizer rule
    const highlight = (state, start, end, silent) => {
        let pos = state.pos;
        const ch = state.src.charAt(pos);

        if (ch !== '=') return false;
        if (state.src.charAt(pos + 1) !== '=') return false;

        const marker = state.src.slice(pos, pos + 2);
        const match = state.src.slice(pos).match(/^==([^=]+)==/);
        
        if (!match) return false;
        
        if (!silent) {
            const token = state.push('highlight_open', 'span', 1);
            token.markup = marker;
            token.attrSet('class', 'text-highlight');
            
            state.push('text', '', 0).content = match[1];
            
            state.push('highlight_close', 'span', -1);
        }

        state.pos += match[0].length;
        return true;
    };

    md.inline.ruler.before('emphasis', 'highlight', highlight);
});

// In markdown-loader.js
md.use((md) => {
    const defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        const href = token.attrGet('href');
        
        if (href && href.startsWith('region:')) {
            const [region, subpage] = href.slice(7).split(':');
            
            // Modify all three tokens in the link sequence
            tokens[idx].tag = 'span'; // opening tag
            tokens[idx + 1].tag = ''; // content
            tokens[idx + 2].tag = 'span'; // closing tag
            
            token.attrSet('class', 'region-link');
            token.attrSet('data-region', region);
            if (subpage) {
                token.attrSet('data-subpage', subpage);
            }
            token.attrs = token.attrs.filter(([name]) => name !== 'href');
        }
        
        return defaultRender(tokens, idx, options, env, self);
    };

    // Add a custom renderer for link_close
    md.renderer.rules.link_close = function(tokens, idx, options, env, self) {
        const token = tokens[idx];
        if (token.tag === 'span') {
            return '</span>';
        }
        return defaultRender(tokens, idx, options, env, self);
    };
});

// Custom rendering rules for special styles
md.renderer.rules.em_open = () => '<span class="text-italic">';
md.renderer.rules.em_close = () => '</span>';
md.renderer.rules.strong_open = () => '<span class="text-bold">';
md.renderer.rules.strong_close = () => '</span>';
md.renderer.rules.code_inline = (tokens, idx) => {
    return '<span class="text-code">' + md.utils.escapeHtml(tokens[idx].content) + '</span>';
};

// Custom container for highlights
md.use((md) => {
    md.renderer.rules.blockquote_open = () => '<div class="content-highlight">';
    md.renderer.rules.blockquote_close = () => '</div>';
});

export async function loadMarkdownContent(filename) {
    try {
        const response = await fetch(`./content/${filename}.md`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const markdown = await response.text();
        return md.render(markdown);
    } catch (error) {
        console.error(`Error loading ${filename}:`, error);
        return 'Content loading failed.';
    }
}