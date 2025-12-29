geek-pi@raspberrypi:~/MagicMirror $ git status
On branch prod
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   modules/default/calendar/package-lock.json
	new file:   modules/default/calendar/package.json
	new file:   modules/default/clock/package-lock.json
	new file:   modules/default/clock/package.json
	new file:   modules/default/helloworld/package-lock.json
	new file:   modules/default/helloworld/package.json
	new file:   modules/default/weather/package-lock.json
	new file:   modules/default/weather/package.json
	modified:   package-lock.json
	new file:   test.wav
	new file:   test2.wav
	new file:   test3.wav

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
  (commit or discard the untracked or modified content in submodules)
	modified:   modules/MMM-AssistantMk2 (modified content, untracked content)

geek-pi@raspberrypi:~/MagicMirror $ git branch
  feature/mirrormirror
  guyfawkeMirror
  master
* prod
geek-pi@raspberrypi:~/MagicMirror $ git push -u prod
fatal: 'prod' does not appear to be a git repository
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
geek-pi@raspberrypi:~/MagicMirror $ git push -u origin prod
Warning: Permanently added the ECDSA host key for IP address '140.82.114.3' to the list of known hosts.
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

----


geek-pi@raspberrypi:~/MagicMirror $ git commit -m 'working test'
Author identity unknown

*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'geek-pi@raspberrypi.(none)')
geek-pi@raspberrypi:~/MagicMirror $ git config --global user.email "horatiousaharris@gmail.com"
geek-pi@raspberrypi:~/MagicMirror $ git config --global user.name "geekcoldhand"
geek-pi@raspberrypi:~/MagicMirror $ git commit -m 'working test'
/usr/bin/npm

> magicmirror@2.24.0 lint:staged
> pretty-quick --staged

🔍  Finding changed files since git revision 7a43151b.
🎯  Found 4 changed files.
✍️  Fixing up modules/default/calendar/package.json.
✍️  Fixing up modules/default/clock/package.json.
✍️  Fixing up modules/default/helloworld/package.json.
✍️  Fixing up modules/default/weather/package.json.
✅  Everything is awesome!
[prod 8c0ceacf] working test
 12 files changed, 5034 insertions(+), 4122 deletions(-)
 create mode 100644 modules/default/calendar/package-lock.json
 create mode 100644 modules/default/calendar/package.json
 create mode 100644 modules/default/clock/package-lock.json
 create mode 100644 modules/default/clock/package.json
 create mode 100644 modules/default/helloworld/package-lock.json
 create mode 100644 modules/default/helloworld/package.json
 create mode 100644 modules/default/weather/package-lock.json
 create mode 100644 modules/default/weather/package.json
 create mode 100644 test.wav
 create mode 100644 test2.wav
 create mode 100644 test3.wav
geek-pi@raspberrypi:~/MagicMirror $ git push -u origin prod
Username for 'https://github.com': geekcoldhand
Password for 'https://geekcoldhand@github.com': 
remote: Invalid username or token. Password authentication is not supported for Git operations.
fatal: Authentication failed for 'https://github.com/geekcoldhand/MagicMirror.git/'
geek-pi@raspberrypi:~/MagicMirror $ 


Please make sure you have the correct access rights
and the repository exists.
geek-pi@raspberrypi:~/MagicMirror $ 

----
geek-pi@raspberrypi:~/MagicMirror $ git push -u origin prod
Username for 'https://github.com': geekcoldhand
Password for 'https://geekcoldhand@github.com': 
remote: Permission to geekcoldhand/MagicMirror.git denied to geekcoldhand.
fatal: unable to access 'https://github.com/geekcoldhand/MagicMirror.git/': The requested URL returned error: 403


