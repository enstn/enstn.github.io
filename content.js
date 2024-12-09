// regionConfig.js

// html reminders, find under text-
// <span class=\"text-highlight\">word</span>
// <span class=\"region-link\" data-region=\"2\">temporal lobe</span>
// <span class=\"text-highlight-bold\">word</span>

// copy pastes:

/* image:
{
    type: "image",
    src: "/api/placeholder/800/400",
    alt: "Frontal Lobe Illustration"
},
*/

/* normal ass text:
{
    type: "text",
    content: "The frontal lobe is one of the most fascinating regions of the human brain. It serves as our command center."
},
*/

/* list:
{
    type: "list",
    title: "Key Functions",
    items: [
        "Executive decision making",
        "Personality expression",
        "Complex planning",
        "Emotional regulation"
    ]
},
*/

/* quote highlight:
{
    type: "highlight",
    content: "Did you know? The frontal lobe doesn't fully develop until around age 25."
},
*/

/* link:
{
    type: "link",
    title: "Research Paper",
    url: "javascript:void(0)",
    description: "Read more about frontal lobe development in adolescents",
    icon: "📄" // Optional emoji icon
},
*/

/* divider:
{
    type: "divider"
},


OR
{
    type: "divider",
    style: {
        margin: "2rem auto",
        height: "2px",
        width: "90%",  // Makes it even shorter
        color: "rgba(255, 255, 255, 0.2)"
    }
},
*/

/* subpage example
title: "Imagined Speech Recognition",
        subtitle: "using BCI to achieve telepathy - because, unfortunately, the magical owl never showed up at my doorstep",
        content: [
            {
                type: "link",
                title: "github/enstn/braincomputerinterface",
                url: "https://github.com/enstn/braincomputerinterface",
                description: "code documentation",
                icon: "🐌" // Optional emoji icon
            },
            {
                type: "divider"
            },
            {
                type: "text",
                content: "<span class=\"region-link\" data-region=\"1\" data-subpage=\"1.1\">subpage embedding test</span>"
            }
        ],
        subpages: {
            "1.1": {
                title: "test subpage embedding",
                subtitle: "test subtitle",
                content: [
                    {
                        type: "text",
                        content: "blablabla."
                    },
                ]
            },
        },
        accentColor: "rgba(255, 255, 255, 1)"
*/
import { loadMarkdownContent } from './md_loader.js';

export async function loadTextContent(filename) {
    return loadMarkdownContent(filename);
}

export const regionContent = {
    "info": {
        title: "About This Website",
        subtitle: "Welcome, you magnificent bloop of cells!",
        content: [
            {
              type: "text",
              textFile: "about_this_website/welcome"
            },
            {
                type: "text",
                content: "<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>"
            },
            {
                type: "image",
                src: "./images/rickroll.webp",
                alt: "why you scrolling so far"
            }
        ],
        subpages: {
            "info.1": {
                title: "Version Control",
                accentColor: "rgba(255, 225, 225, 1)",
                subtitle: "",
                content: [
                    {
                        type: "text",
                        textFile: "about_this_website/vcinfo"
                    }
                ]
            },
            "info.2": {
                title: "Hotkeys",
                accentColor: "rgba(255, 225, 225, 1)", // maybe pinkish comes from here
                subtitle: "not vim-styled, sorry F.K.",
                content: [
                    {
                        type: "list",
                        title: "the key bindings are as following: ",
                        items: [
                            "numbers '1' to '5' => boxes 1 - 5",
                            "'q' => quit and close current page",
                            "'i' => information about this website",
                            "'v' => version control"
                        ]
                    },
                    {
                        type: "divider"
                    }
                ]
            },
            "info.3": {
                title: "About Me",
                subtitle: "",
                content: [
                    {
                        type: "text",
                        textFile: "about_this_website/about_me"
                    }
                ]
            },

        },
        accentColor: "rgba(255, 0, 0, 0.69)"
    },
    "random": {
        title: "Random Output",
        subtitle: "",
        content: [
            {
                type: "text",
                content: `
                <div class="date-item">
                    <span class="region-link" data-region="random" data-subpage="random.1">Fun Facts</span>
                    <div class="date-dots"></div>
                    <span class="date-label">📁</span>
                </div>
                `
            },
            {
                type: "text",
                content: `
                <div class="date-item">
                    <span class="region-link" data-region="random" data-subpage="random.2">Cheese Is Where The Magic Happens</span>
                    <div class="date-dots"></div>
                    <span class="date-label">quantum mechanics rant</span>
                </div>
                `
            },
            {
                type: "text",
                content: `
                <div class="date-item">
                    <span class="region-link" data-region="random" data-subpage="random.3">Website-Development 101</span>
                    <div class="date-dots"></div>
                    <span class="date-label">key takeaways</span>
                </div>
                `
            }
        ],
        subpages: {
            "random.1": {
                title: "Fun Facts",
                subtitle: "",
                content: [
                    {
                        type: "text",
                        textFile: "random/fun_facts"
                    }
                ]
            },
            "random.2": {
                title: "Cheese Is Where The Magic Happens",
                subtitle: "inspired by MIT spring lectures on quantum mechanics by Prof. Adams",
                // accentColor: "rbga(225, 225, 225, 0.8",
                content: [
                    {
                        type: "highlight",
                        textFile: "random/qm"
                    },
                    
                ]
            },
            "random.3": {
                title: "Website-Development 101",
                subtitle: "",
                accentColor: "rbga(225, 225, 225, 0.8)",
                content: [
                    {
                        type: "text",
                        textFile: "random/webdev"
                    },  
                ]
            }
        },
        accentColor: "rgba(255, 255, 255, 1)"
    },
    "1": {
        title: "Imagined Speech Recognition",
        subtitle: "electroencephalogram based brain computer interface",
        content: [
            {
                type: "link",
                title: "github/enstn/braincomputerinterface",
                url: "https://github.com/enstn/braincomputerinterface",
                description: "code documentation",
                icon: "🐌" // Optional emoji icon
            },
            {
                type: "divider"
            },
            {
                type: "text",
                content: `
                <div class="date-item">
                    <span class="region-link" data-region="1" data-subpage="1.1">Introduction to Telepathy</span>
                    <div class="date-dots"></div>
                    <span class="date-label">prefix</span>
                </div>
                `
            },
            {
                type: "text",
                content: `
                <div class="date-item">
                    <span class="region-link" data-region="1" data-subpage="1.2">Project Update: 1</span>
                    <div class="date-dots"></div>
                    <span class="date-label">09/Dec/2024</span>
                </div>
                `
            }
        ],
        subpages: {
            "1.1": {
                title: "Introduction to Telepathy",
                subtitle: "intro chapter | general info",
                accentColor: "rgba(225, 225, 225, 1)",
                content: [
                    {
                        type: "text",
                        textFile: "telepathy/telepathy_intro"
                    }
                ]
            },
            "1.2": {
                title: "Data Acquisition",
                subtitle: "project update: 1",
                content: [
                    {
                        type: "text",
                        testFile: "telepathy/telepathy_1"
                    },
                ]
            }
        },
        accentColor: "rgba(255, 255, 255, 1)"
    },
    "2": {
        title: "Neuropong",
        subtitle: "training simulated neurons to play pong",
        content: [
            {
                type: "link",
                title: "github/enstn/neuropong",
                url: "https://github.com/enstn/neuropong",
                description: "code documentation",
                icon: "🐌" // Optional emoji icon
            },
            {
                type: "divider"
            },
            {
                type: "text",
                content: `
                <div class="date-item">
                    <span class="region-link" data-region="2" data-subpage="2.1">one</span>
                    <div class="date-dots"></div>
                    <span class="date-label">15.11.24 | 06:29</span>
                </div>
                `
            },
            {
                type: "text",
                content: `
                <div class="date-item">
                    <span class="region-link" data-region="2" data-subpage="2.2">two</span>
                    <div class="date-dots"></div>
                    <span class="date-label">15.11.24 | 06:29</span>
                </div>
                `
            }
        ],
        subpages: {
            "2.1": {
                title: "one",
                subtitle: "test subtitle",
                content: [
                    {
                        type: "text",
                        content: "blablabla."
                    },
                ]
            },
            "2.2": {
                title: "two",
                subtitle: "test subtitle",
                content: [
                    {
                        type: "text",
                        content: "blablabla."
                    },
                ]
            }
        },
        accentColor: "rgba(255, 255, 255, 1)"
    },
    "3": {
        title: "Neurobiology",
        subtitle: "abusing feynman-technique for my self-study journey",
        content: [

        ],
        accentColor: "rgba(255, 0, 0, 0.6)"
    },
    "booklist": {
        title: "Readings",
        subtitle: "rating based on degree of perspective / behavior change caused by said book",
        content: [
            {
                type: "custom-booklist",
                items: [
                    {
                        id: "brain-changes",
                        title: "The Brain that Changes Itself",
                        author: "Norman Doidge",
                        score: 9
                    },
                    {
                        id: "GEB",
                        title: "Gödel, Escher, Bach",
                        author: "Douglas R. Hofstadter",
                        score: 0
                    }
                ]
            }
        ],
        subpages: {
            "brain-changes": {
                title: "The Brain that Changes Itself",
                subtitle: "Norman Doidge",
                content: [
                    {
                        type: "highlight",
                        textFile: "readings/brain_that_changes_itself"
                    }
                ]
            },
            "GEB": {
                title: "Gödel, Escher, Bach",
                subtitle: "Douglas R. Hofstadter",
                content: [
                    {
                        type: "highlight",
                        textFile: "readings/GEB"
                    }
                ]
            }
        },
        accentColor: "rgba(255, 255, 255, 1)"
    }
};
