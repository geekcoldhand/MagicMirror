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

Please make sure you have the correct access rights
and the repository exists.
geek-pi@raspberrypi:~/MagicMirror $ 

