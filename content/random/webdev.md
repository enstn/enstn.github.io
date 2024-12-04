I made a lot of mistakes costing me time and effort while developing this website. The key takeaways are quickly 
elaborated here to hopefully help you a little bit. I wish you smooth sailing in your own website-building journey. <br> <br>
To encourage you to start, each note will include practical tools you can implement immediately (denoted by ->)

<span class="text-highlight-bold">how to start</span> <br> <br>

Use githubpages. It's free, you can write code, deploy your website and host a custom domain. <br> <br>

-> Go to github.com; create an account; create a repo called yourusername.github.io; make an index.html file; deploy your repo 
using githubpages (just read the doc); then use stackoverflow, reddit, github, ChatGPT, ClaudeAI or whatever to write a hello world text in your
html.file. <br> <br>
 
If you're an ETH student thinking about using your given ETH domain - I recommend not to (except for TAs). I started 
there as well and have now switched to githubpages. Several reasons: <br> <br>

1) ETH domains "only" have PHP and CGI (more than enough for static websites)  <br> 
2) You need to ssh and login with cisco connect every time <br>
3) ETH servers down = you can't code, which happens more often than you think  <br> 
4) If you use vscode, you need to delete .vscode-server with a terminal ssh session before every vscode session
(bc ETH servers have permission issues with VScode ssh extention) <br>
 
<span class="text-highlight-bold">linking squarespace custom domain to github pages</span> <br> <br>

-> Here's a step by step: <br> <br>

1) make sure your repo is already deployed to github pages (read the first takeaway) <br> <br>
2) in terminal, run {dig yourusername.github.io} to get IP addresses <br> <br>
3) use them to set up four custom DNS settings in squarespace like this: <br>
Host: @ | Type: A | Data: insertyourIPaddresses <br> <br>
4) add the final custom record for CNAME: <br>
Host: www | Type: CNAME | Data: yourusername.github.io <br> <br>
5) delete the default DNS setting so only your custom settings are left <br> <br>
5) in github, create a CNAME file in root dir of your publishing branch + write your domain name into it <br> <br>
6) in github repo settings, go to pages and check whether custom domain has recognised CNAME file or not <br> <br>
7.1) if yes, click on check DNS and wait, this might take a while (24 hours for me) <br> <br>
7.2) if no, manually type in your domain name and click DNS check <br> !make sure it's the same as written in your CNAME file! <br> <br>
8) after success, click force enable https; you should be able to see your code deployed on your custom domain 🐌


<span class="text-highlight-bold">console.log() is the goat</span> <br> <br>

Here's a fancy term for non-coders reading this: debugging. You copy-pasted / wrote some code but it doesn't work as intented?
You don't know which part of the code? Well console.log() is here to save the day. <br> <br>

-> go to suspicious code portions; put console.log after critical returns or function calls; deploy & check the web
console for whether the print statement is reached or not; this will give you a scope of what's working and what not.

<span class="text-highlight-bold">"clean code" is a scam</span> <br> <br>

Whoever said that functions should only do one thing and at max. be four lines long - nuh uh.
Seriously, don't do it. No one is looking at my shitty website and thinking: "Damn, I hope the codebase of this is structured like Kant."

<br> <br> And if someone was to look into it, who on earth enjoys reading Kant? Yeah right, look up 500 different definitions 
in 500 different locations so you can understand the first god damn sentence. What a tryhard. <br> <br>

-> as primogen said, just loosely follow principle of locality, if at all; nothing matters, no one is going to read your codabase; 


<span class="text-highlight-bold">LLMs are your biggest friends and enemies</span> <br> <br>

If you're gonna use LLMs - please don't use ChatGPT. As someone who is geniunely a beginner in coding,
even I am able to confidently say that ChatGPT sucks at coding (as of Nov 27th 2024). Go for ClaudeAI. <br> <br> 

Be careful with LLM usage. They take away the process of thrifting through different internet sites and reading endless documentations
to piece together a solution. 

<br> <br> Admittedly, that's a great way to jumpstart your project (especially for non-coders). But in the long-term, overusage will 
catch up to you once your project becomes more complex. I had to deal with this myself.

<br> <br> LLMs are not good enough yet to zero-shot coding problems, so you'll be forced to
debug a codebase which you don't quite understand. (You'll likely just end up reading the docs nonetheless & manually fix the code - 
get scammed into actual coding lol) <br> <br>

-> non-coders: ClaudeAI for coding, ChatGPT for explaining; pray and hope for errorless code (might need a few attempts); threatening self-harm 
will probably increase quality of code.<br> <br>

-> beginner-coders: leverage LLM as teacher, prompt sth like "Never return full code & play a role of an instructor. 
Help me diagnose the problem at hand & guide me towards learning the most efficient solution approaches." <br> <br>


