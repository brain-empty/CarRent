Really just made as a college project to learn blockchain, nowhere near good for usage. 

## Running the app
- After cloning the repo, run an npm i
- run "truffle console" and then "migrate"
    - if later, the app doesn't show anything on the list for cars availiable to rent (by default, a Toyota MR3 should be there upon initialization, try keeping this console open as you try to use the app.)
- ctrl + c two times to get out of the truffle console
- run the command; 'npm run dev'
- the website should open up
    - if everything is working correctly, a simple webpage should show. 
    - the blockchain part is working correctly if you can see a listening for "Toyota MR3"
    - from here, you can add a car or click on rent or unrented

### using it with Ganache and Metamask
- make a ganache project
- setup metamask
- setup the ganache network in the metamask wallet
- import a ganache wallet

NOTE: Make sure you have connceted and have selected the account before you run it. 
- When you're on the webpage, click on the metamask extension
- Next to the account name dropdown, there should be a globe like icon, click on that
- It should show whether the current account is connected or let you connect to it 