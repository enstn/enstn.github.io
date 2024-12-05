Here's a list of quick-starts I'd recommend myself if I were to start my webdev journey again; compiled from my own errors and wasted time / effort. I wish you a smoother sailing in your web developement!

<br>

---

> ### How To Start <br><br>
> Use githubpages. It's free, you can write and store code, deploy your website and host a custom domain name. All you need to do is create a [github](https://github.com) account.  
> -> here's the [quickstart](https://docs.github.com/en/pages/quickstart) 

---

> ### How To Test Deploy / Debug <br><br>
> You could deploy on github pages to see if your website is working or not, but I found it to be too slow (especially if you're using a custom domain). Here's what I did: deploy on a local port, that way any code changes will be immediately visible:
> 1) Create a python virtual enviroment (I used conda) with all packages your website needs
> 2) Run ``` python -m http.server 8000 ``` in your virtual env
> 3) Now you'll be able to see your website in real time at localhost:8000 (just type this into your browser)

> For debugging, I just spammed console.log() everywhere to figure out what was going on. Reddit, Stackoverflow, YouTube are your best helpers here. 

---

> ### How To Save Time

> ==Don't overuse LLMs.== This might seem counterintuitive, since LLMs can generate code to save time, right? Yes, in the short run. Especially in the beginning to jumpstart you project. But in the long-run, this is going to hurt you. You'll meet a point of complexity where LLMs seem to fail, and debugging a codebase you didn't write yourself is hell. Trust me, this is what happened to me. In the end, I still had to go back and read the docs, think about the problems myself and go through different solutions on the internet. So why not do it right away.

> ==Don't try to reinvent the wheel.== This only applies to saving time. Building something from scratch and going after the problem with nothing but your cup of tea (and the internet lol) is exciting. Sure, your first implementation is going to suck. But then you iterate over it, and again, and again, and it slowly converges to something acceptable. This shit takes times though. So if you're only looking for the optimal solution, just search the internet for exisiting packages or whatever. Don't be like me and create hundreds of unique HTML classes which you then check for in the text.file you load into the page and render them if a flag strikes. Just use an exisiting markdown processor. In the end, this is where I landed as well.
---

> ### Linking Squarespace Custom Domain to Github Pages <br><br>
> -> Here's a step by step: 
> 1) make sure your repo is already deployed to github pages (read *How To Start*) 
> 2) in terminal, run ```dig yourusername.github.io ```to get IP addresses
> 3) use them to set up four custom DNS settings in squarespace like this: ==Host: @ | Type: A | Data: insertyourIPaddresses==
> 4) add the final custom record for CNAME: ==Host: www | Type: CNAME | Data: your githubio==
> 5) delete the default DNS setting so only your custom settings are left 
> 5) in github, create a CNAME file in root dir of your publishing branch + write your domain name into it 
> 6) in github repo settings, go to pages and check whether custom domain has recognised CNAME file or not 
> 7) if yes, click on check DNS and wait, this might take a while (24 hours for me) 
>    if no, manually type in your domain name and click DNS check !make sure it's the same as written in your CNAME file! 
> 8) after success, click force enable https; you should be able to see your code deployed on your custom domain 🐌

---

> ### Building on ETH Domain <br><br>
> If you're an ETHZ Student and **not** a TA - just use github pages. I started with ETH domain as well before I switched since: 
> 1) ETH domains "only" have PHP and CGI
> 2) You need to login to cisco VPN & ssh every single time
> 3) ETH servers have permission issues with VSCode. ==If VSCode is your main IDE, delete .vscode-server with a terminal ssh session before you ssh with VSCode==

---


