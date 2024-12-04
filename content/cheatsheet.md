# Website Markdown Cheatsheet

## Text Styling
*italic text* - wrap with single asterisks
**bold text** - wrap with double asterisks
`code text` - wrap with backticks
==highlighted text== - wrap with double equals

## Headings
# H1 Title
## H2 Subtitle
### H3 Section
#### H4 Subsection

## Content Blocks
> This is a highlight block. It uses our content-highlight class.
> You can span multiple lines.
> Great for important information or quotes.

## Lists
- List items start with a hyphen
- Support multiple lines
  - Indent with two spaces for nested items
    - You can go deeper
- Back to main level

## Links
[External Link](https://example.com)
[Region Link](region:1) - links to main region
[Region Link with Subpage](region:1:1.1) - links to specific subpage

## Navigation Examples
- Go to [Random](region:random)
- Visit [Reading List](region:booklist)
- Check [Telepathy](region:1)
- See [Neuropong](region:2)
- Learn about [Neurobiology](region:3)

## Code Blocks
```python
# Code block with syntax highlighting
def example():
    return "Hello World"
```

## Page Dividers
---
Three hyphens create a horizontal divider

## Combining Styles
> Here's a highlight block containing:
> - A list item with *italic text*
> - Another with **bold text**
> - One with ==highlighted text==
> - And a [region link](region:1:1.1)

## General Tips
1. Leave a blank line between different elements
2. For lists, keep consistent indentation
3. Region links use region:id format
4. Highlight blocks use > at start of each line
5. Double space at end of line for line break  
   Like this

## Common Use Cases
> **Important Note**  
> This is a ==highlighted important== note in a highlight block

*To link between pages, use the region: prefix:*
- [See Introduction](region:1:1.1)
- [Back to Main](region:1)