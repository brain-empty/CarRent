App = {
    loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
  
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },
  
    loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0]
      console.log(App.account)
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const carRent = await $.getJSON('carRent.json')
      App.contracts.carRent = TruffleContract(carRent)
      App.contracts.carRent.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.carRent = await App.contracts.carRent.deployed()
      console.log(App.carRent)
    },
  
    render: async () => {
      // Prevent double render
      if (App.loading) {
        return
      }
  
      // Update app loading state
      App.setLoading(true)
  
      // Render Account
      $('#account').html(App.account)
  
      // Render Cars
      await App.renderCars()
  
      // Update loading state
      App.setLoading(false)
    },
  
    renderCars: async () => {
      // Load the total car count from the blockchain
      const carCount = await App.carRent.carCount()
      const $carTemplate = $('.carTemplate')
  
      // Render out each car with a new car template
      for (var i = 1; i <= carCount; i++) {
        // Fetch the car data from the blockchain
        const car = await App.carRent.cars(i)
        console.log(car)
        const carId = car[0].toNumber()
        const carContent = car[1]
        const carRented = car[2]
  
        // Create the html for the car
        const $newCarTemplate = $carTemplate.clone()
        $newCarTemplate.find('.content').html(carContent)
        $newCarTemplate.find('input')
                        .prop('name', carId)
                        .prop('checked', carRented)
                        .on('click', App.toggleRented)
  
        // Put the car in the correct list
        if (carRented) {
          $('#completedCarList').append($newCarTemplate)
        } else {
          $('#carList').append($newCarTemplate)
        }
  
        // Show the car
        $newCarTemplate.show()
      }
    },
  
    createCar: async () => {
      App.setLoading(true)
      const content = $('#newCar').val()
      console.log(content)
      await App.carRent.createCar(content)
      window.location.reload()
    },
  
    toggleRented: async (e) => {
      App.setLoading(true)
      const carId = e.target.name
      await App.carRent.toggleRented(carId)
      window.location.reload()
    },
  
    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean) {
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }
  }
  
  $(() => {
    $(window).load(() => {
      App.load()
    })
  })