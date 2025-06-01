$(function(){
    // Show start screen first, hide game
    $("#startScreen").show();
    $("#game").hide();
    
    // Start screen event handlers
    $("#newGameBtn").on('click', function(){
        $("#startScreen").hide();
        $("#game").show();
        initializeGame();
    });
    
    $("#aboutBtn").on('click', function(){
        $(".title-container").hide();
        $("#aboutSection").show();
    });
    
    $("#backBtn").on('click', function(){
        $("#aboutSection").hide();
        $(".title-container").show();
    });
});

function initializeGame(){
    if (localStorage.getItem('pastLives')==null){
        pastLives = {lives:[]};
        console.log("wasnt defined")
    }
    else{
        pastLives = JSON.parse(localStorage.getItem('pastLives'));
        console.log('was defined')
    }
    function save(obj){
        pastLives.lives.push(obj)
        localStorage.setItem('pastLives',JSON.stringify(pastLives));
        console.log('live was saved')
    }
    let lovers = 0;
    let murders = 0;
    let totalStoned = 0;
    buildings = ['hotel','condo','hospital','apartment','grocery store']
  
    let mNames = ['Randy ','Tom ','Hank ','Bill ','George ','Leo ','Fred ','Jeff ','Steve ','Riley ','Carl ','Braden ','Clark ','Liam ','Colten ','Peter ','Ned ','Ethan ','William ','Mason ','Gavin ','Will ','Arnold ','Adam ','Dave ','Tony ','Larry ','David ','Connor ','Simon ','Darell ','Oscar ','Evan ','Michael ','Oliver ','Pete ','Lucas ','Steve ','Bob ',"Ben ","Roy ","Don ","Antonio ","Sheldon ","David "];
  let fNames = ['Tina ','Stacy ','Linda ','Zelly ','Lia ','Cindy ','Terisha ','Jane ','Sarah ','Julia ','Clay ','Sally ','Lillie ','Ana ','Maya ','Scarlett ','Christine ','Emily ','Eva ','Ava ','Mariah ','Taylor ','Sabrina ','Penelopee ','Harriet ','May ','Adrian ','Lavelle ','Chantel ','Janette ','Stephanie ','Nancy ','Susan ','Laura ','Ruby ','Amanda ','Mildred ','Lisa ','Heather ','Missy ','Lana ','Cierra '];
  let lNames = ['Harrison','Lanson','Davidson','Williams','Johnson','Smith','Wilson','Brown','Davis','Miller','Mohammed','Rodriguez','Sampson','Newman','Derren','Rowan','Garfield','Parker','Gavia','Swift','Costanza','Jenkins','Armstrong','Cook','White','Rivera','Clarke','Hoffman','McGrath','Frazier','Tubman','Mayweather','Sandler','Stark','Fisher','Jones','Washington','Bell','Roberts','Arnold','Crawford','Hanks','Vance',"Fabian","Quarteroy","Corleone","Cooper","Switzerland","Backwards","Price","Harvey "];
  let genders = ['Male','Female'];
  let pastPeople = [];
  
  choice = max => max[Math.floor(Math.random()*max.length)];

  function prisShuf(){
    prisonInmates = [];
    for(let x = 0; x < 30; x++){
      inmateObj={
            last_name: choice(lNames),
            gender: you['gender'],
            age: randrange(30) + you['age'],
            status: 'inmate',
            relation: randrange(10),
            money: randrange(1000),
            blood: false,
            health: randrange(50),
            happy: randrange(50),
            smarts: randrange(50),
            looks: randrange(50),
        }
        if (you['gender'] == 'Male'){
          inmateObj['first_name']=choice(mNames);
        }
        else{
          inmateObj['first_name']=choice(fNames);
        }
        inmateObj['full_name']=inmateObj['first_name'] + ' ' + inmateObj['last_name'];
      prisonInmates.push(inmateObj);
    }
  }
  
  
  let events = 
  {
      "baby":
      [
          {
              "text":'My parents forced me to eat broccoli',
              "health":1,
              "happy":-1,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':0
          },
          {
              "text":'I spilled milk all over the floor when eating.',
              "health":0,
              "happy":0,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':0
          },
          {
              "text":'I want to buy a toy very badly.',
              "health":0,
              "happy":1,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':0
          },
          {
              "text":'My parents got mad at me for throwing a fit.',
              "health":0,
              "happy":-1,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':0
          },
          {
              "text":'I drew a picture of a turtle.',
              "health":0,
              "happy":0,
              "smarts":2,
              "looks":0,
              'money':0,
              'comedy':0
          },
          {
              "text":'I sneezed and milk came out of my nose.',
              "health":0,
              "happy":-1,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':0
          },
          {
              "text":'I went to the park.',
              "health":0,
              "happy":2,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':0
          },
          {
              "text":'Someone told me a funny joke.',
              "health":0,
              "happy":0,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':1
          }
      ],
      "child":
      [
          {
              "text":'I stubbed my toe while walking.',
              "health":0,
              "happy":-1,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'The kids my age are really into Fortnite',
              "health":0,
              "happy":0,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I fell off the lunch table when standing on it and everyone laughed at me.',
              "health":-1,
              "happy":-2,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I made up a funny joke and people laughed.',
              "health":0,
              "happy":1,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':1
          },
          {
              "text":'A bully humiliated me in front of my peers.',
              "health":0,
              "happy":-3,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I spent the day drawing on the walls.',
              "health":1,
              "happy":2,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          }
      ],
      "teen":
      [
          {
              "text":'I found a dollar on the ground',
              "health":0,
              "happy":1,
              "smarts":0,
              "looks":0,
              "money":1,
              'comedy':0
          },
          {
              "text":'I had an acne outbreak when I woke up',
              "health":0,
              "happy":-1,
              "smarts":0,
              "looks":-2,
              "money":0,
              'comedy':0
          },
          {
              "text":'My teacher is moving my grade down because they hate me.',
              "health":0,
              "happy":-2,
              "smarts":-2,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'A kid got kicked out of my class because they were vaping in class.',
              "health":0,
              "happy":0,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'Someone said they think I look cute.',
              "health":0,
              "happy":2,
              "smarts":0,
              "looks":1,
              "money":0,
              'comedy':0
          },
          {
              "text":'Someone told me a funny joke.',
              "health":0,
              "happy":0,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':1
          }
      ],
      "adult":
      [
          {
              "text":'I found a dollar on the ground',
              "health":0,
              "happy":1,
              "smarts":0,
              "looks":0,
              "money":1,
              'comedy':0
          },
          {
              "text":'A homeless man began yelling at me.',
              "health":0,
              "happy":-1,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I listened to a podcast',
              "health":0,
              "happy":1,
              "smarts":1,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'My friend spammed me with 9000 emails and glitched out my phone.',
              "health":0,
              "happy":-1,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I can now see lines on my forehead',
              "health":0,
              "happy":0,
              "smarts":0,
              "looks":-3,
              "money":0,
              'comedy':0
          },
          {
              "text":'I spilled water all over my pants and a crowd of people laughed at me.',
              "health":0,
              "happy":-1,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I tripped over a rock and fell',
              "health":-5,
              "happy":0,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I saw a celebrity in town.',
              "health":2,
              "happy":1,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I stepped in a odd green liquid.',
              "health":-1,
              "happy":-1,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I can see the smile wrinkles on my face.',
              "health":0,
              "happy":0,
              "smarts":0,
              "looks":-1,
              "money":0,
              'comedy':0
          },
          {
              "text":'A random kid spit in my face.',
              "health":0,
              "happy":-3,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'An elderly woman started yelling at me.',
              "health":0,
              "happy":-1,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'I found a 20 dollar bill on the ground.',
              "health":0,
              "happy":3,
              "smarts":0,
              "looks":0,
              "money":20,
              'comedy':0
          },
          {
              "text":'I inhaled some toxic gas on accident.',
              "health":-3,
              "happy":0,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'A car ran into me!',
              "health":-7,
              "happy":0,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'Someone told me a funny joke.',
              "health":0,
              "happy":0,
              "smarts":0,
              "looks":0,
              'money':0,
              'comedy':1
          }
      ],
      'prison':
      [
          {
              "text":'A prisoner ripped some of my hair out.',
              "health":-1,
              "happy":-3,
              "smarts":0,
              "looks":-2,
              "money":0,
              'comedy':0
          },
          {
              "text":'A prisoner beat me up',
              "health":-4,
              "happy":-2,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'The guards continually checked my cell today.',
              "health":0,
              "happy":-2,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'One prisoner keeps stealing my food.',
              "health":-2,
              "happy":-2,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'A prisoner shanked me!',
              "health":-10,
              "happy":-2,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'My cellmate died of a cocaine overdose!',
              "health":0,
              "happy":-2,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          },
          {
              "text":'Nobody came to visit me',
              "health":0,
              "happy":-2,
              "smarts":0,
              "looks":0,
              "money":0,
              'comedy':0
          }
      ]
  }
  
  choice = listName => listName[Math.floor(Math.random()*listName.length)];
  randrange = max => Math.floor(Math.random()*max);
  function comify(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  let traits = 
  [
      {
          name:'Skinny',
          healthYear: 0,
          looksYear: 0,
          comedyYear: 0
      }
  ]
  
  let activities = 
  [
      {
          "title":'Go for a run',
          "text":'I went for a run',
          "health":2,
          "looks":2,
          "happy":2,
          "smarts":0,
          "smartsReq":0,
          "healthReq":10,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":5,
          "money":0,
          'comedy':0
      },
      {
          "title":'Go for a swim',
          "text":'I went for a swim <span style="color:red">-20$</span>',
          "health":4,
          "looks":1,
          "happy":2,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":20,
          "ageReq":5,
          "money":0,
          'comedy':0
      },
      {
          "title":'Visit A Comedian',
          "text":'I watched a stand up comedian <span style="color:red">-20$</span>',
          "health":0,
          "looks":0,
          "happy":2,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":20,
          "ageReq":5,
          "money":0,
          'comedy':3
      },
      {
          "title":'Eat a protein shake',
          "text":'I ate a protein shake <span style="color:red">-5$</span>',
          "health":3,
          "looks":1,
          "happy":0,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":5,
          "ageReq":3,
          "money":0,
          'comedy':0
      },
      {
          "title":'Study',
          "text":'I studied for a while',
          "health":0,
          "looks":0,
          "happy":-1,
          "smarts":1,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":5,
          "money":0,
          'comedy':0
      },
      {
          "title":'Meditate',
          "text":'I meditated for a while',
          "health":0,
          "looks":0,
          "happy":5,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":5,
          "money":0,
          'comedy':0
      },
      {
          "title":'Watch some Tv',
          "text":'I watched some TV',
          "health":0,
          "looks":0,
          "happy":8,
          "smarts":-1,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":3,
          "money":0,
          'comedy':0
      },
      {
          "title":'Take a bath',
          "text":'I took a bath.',
          "health":0,
          "looks":0,
          "happy":4,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":3,
          "money":0,
          'comedy':0
      },
      {
          "title":'Go to a party',
          "text":'I went to a party.',
          "health":-2,
          "looks":0,
          "happy":4,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":14,
          "money":0,
          'comedy':0
      },
      {
          "title":'Go to a city party',
          "text":'I went to a party in the city. <span style="color:red">-$50</span>',
          "health":-5,
          "looks":0,
          "happy":13,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":50,
          "ageReq":16,
          "money":0,
          'comedy':0
      },
      {
          "title":'Go clubbing in the city',
          "text":'I went clubbing in the city. <span style="color:red">-$100</span>',
          "health":-10,
          "looks":0,
          "happy":20,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":100,
          "ageReq":21,
          "money":0,
          'comedy':0
      },
      {
          "title":'Go to a place of worship.',
          "text":'I went to a place of worship.',
          "health":0,
          "looks":0,
          "happy":3,
          "smarts":1,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":4,
          "money":0,
          'comedy':0
      },
      {
          "title":'Get plastic Surgery',
          "text":'I got plastic surgery <span style="color:red">-$60,000</span>',
          "health":-10,
          "looks":30,
          "happy":0,
          "smarts":0,
          "smartsReq":0,
          "healthReq":10,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":60000,
          "ageReq":4,
          "money":0,
          'comedy':0
      },
      {
          "title":'Mow the neighbors lawn',
          "text":'I mowed my neighbors lawn. <span style="color:green">+$20</span>',
          "health":0,
          "looks":0,
          "happy":-3,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":13,
          "money":20,
          'comedy':0
      },
      {
          "title":'Workout',
          "text":'I worked out!',
          "health":3,
          "looks":1,
          "happy":-1,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":0,
          "ageReq":14,
          "money":0,
          'comedy':0
      },
      {
          "title":'Hair Cut',
          "text":'I got a haircut! <span style="color:red">-30$</span>',
          "health":0,
          "looks":3,
          "happy":0,
          "smarts":0,
          "smartsReq":0,
          "healthReq":0,
          "looksReq":0,
          "happyReq":0,
          "moneyReq":30,
          "ageReq":5,
          "money":0,
          'comedy':0
      }
  ]
  
  for(x in activities){
      activities[x]['done']=false
  }
  
  let careers = 
  [
      {
          "title":"Janitor",
          "salary": 20000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":0,
          "looksReq":0,
          "prisonYears":20,
          "schoolReq":0
      },
      {
          "title":"Plumber",
          "salary": 26000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":20,
          "looksReq":0,
          "prisonYears":20,
          "schoolReq":0
      },
      {
          "title":"Fast Food Worker",
          "salary": 26000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":0,
          "looksReq":0,
          "prisonYears":10,
          "schoolReq":0
      },
      {
          "title":"Dog Trainer",
          "salary": 30000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":30,
          "looksReq":0,
          "prisonYears":2,
          "schoolReq":0
      },
      {
          "title":"Painter",
          "salary": 22000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":10,
          "looksReq":0,
          "prisonYears":20,
          "schoolReq":0
      },
      {
          "title":"Model",
          "salary": 64000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":0,
          "looksReq":85,
          "prisonYears":50,
          "schoolReq":0
      },
      {
          "title":"Librarian",
          "salary": 19000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":40,
          "looksReq":0,
          "prisonYears":10,
          "schoolReq":0
      },
      {
          "title":"Security Guard",
          "salary": 32000,
          "healthReq":60,
          "happyReq":0,
          "smartsReq":0,
          "looksReq":0,
          "prisonYears":0,
          "schoolReq":0
      },
      {
          "title":"Doctor",
          "salary": 240000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":70,
          "looksReq":0,
          "prisonYears":0,
          "schoolReq":1
      },
      {
          "title":"Programmer",
          "salary": 82000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":50,
          "looksReq":0,
          "prisonYears":10,
          "schoolReq":2
      },
      {
          "title":"PA",
          "salary": 130000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":40,
          "looksReq":0,
          "prisonYears":0,
          "schoolReq":1
      },
      {
          "title":"Chef",
          "salary": 65000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":40,
          "looksReq":0,
          "prisonYears":0,
          "schoolReq":3
      },
      {
          "title":"Dentist",
          "salary": 125000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":60,
          "looksReq":0,
          "prisonYears":0,
          "schoolReq":4
      },
      {
          "title":"Teacher",
          "salary": 26000,
          "healthReq":0,
          "happyReq":0,
          "smartsReq":60,
          "looksReq":0,
          "prisonYears":0,
          "schoolReq":5
      },
      {
          "title":"Gym Instructor",
          "salary": 32000,
          "healthReq":70,
          "happyReq":0,
          "smartsReq":40,
          "looksReq":0,
          "prisonYears":0,
          "schoolReq":0
      },
  ]
  
  let houses =
  [
      {
          "name":"Shack on "+choice(lNames)+' street',
          "cost":30000,
          "yearly":1200,
          "health":0,
          "happy":-1,
          "own":false
      },
      {
          "name":"Cottage on "+choice(lNames)+' street',
          "cost":70000,
          "yearly":2800,
          "health":0,
          "happy":0,
          "own":false
      },
      {
          "name":"Cottage on "+choice(lNames)+' street',
          "cost":100000,
          "yearly":4000,
          "health":0,
          "happy":0,
          "own":false
      },
      {
          "name":"House on "+choice(lNames)+' road',
          "cost":130000,
          "yearly":5200,
          "health":0,
          "happy":0,
          "own":false
      },
      {
          "name":"House on "+choice(lNames)+' street',
          "cost":170000,
          "yearly":6800,
          "health":0,
          "happy":0,
          "own":false
      },
      {
          "name":"House on "+choice(lNames)+' street',
          "cost":200000,
          "yearly":8000,
          "health":0,
          "happy":0,
          "own":false
      },
      {
          "name":"House on "+choice(lNames)+' Avenue',
          "cost":300000,
          "yearly":12000,
          "health":0,
          "happy":0,
          "own":false
      },
      {
          "name":"House on "+choice(lNames)+' Lane',
          "cost":500000,
          "yearly":20000,
          "health":0,
          "happy":0,
          "own":false
      },
      {
          "name":"Mansion on "+choice(lNames)+' street',
          "cost":3000000,
          "yearly":120000,
          "health":2,
          "happy":1,
          "own":false
      },
  ]
  
  let colleges =
  [
      {
          "title":"Medical School",
          "yearly":52000,
          "smartsReq":70,
          "points":1,
          "years":9
      },
      {
          "title":"Programming School",
          "yearly":6500,
          "smartsReq": 40,
          "points":2,
          "years":4
      },
      {
          "title":"Culinary School",
          "yearly":18750,
          "smartsReq": 20,
          "points":3,
          "years":2
      },
      {
          "title":"Dental School",
          "yearly":37000,
          "smartsReq": 60,
          "points":4,
          "years":4
      },
      {
          "title":"General College",
          "yearly":12000,
          "smartsReq": 40,
          "points":5,
          "years":4
      }
  ]
  
  let choiceEvents = 
  {
      "baby":[
          ['Toys!','You found a toy on the ground? Will you take it?','linear-gradient(#ff8c00,#ff4500)','Take the toy','Ignore it','I took a toy that I found on the ground.','I ignored a cool toy I saw on the ground.',
          function()
          {
              you['happy']+=2;
              if (randrange(3)==1){
                  $("#events").append(`<br><sh class='event'>The kid who owned the toy screamed at me</sh>`);
              }else{
                  $("#events").append(`<br><sh class='event'>I could see the owner of the toy crying</sh>`);
              }
          },
          function()
          {
              you['happy']-=1
          }],
          ['Crayons','You found a crayon on the ground? What will you do?','linear-gradient(#ff8c00,#ff4500)','Draw on the walls','Ignore it','I drew all over the walls. My family got really angry','I ignored a crayon I found.',
          function()
          {
              you['happy']-=3
              you['smarts']-=1
          },
          function(){
              you['smarts']+=3
              you['happy']+=2
          }],
          ['Marker','You found a marker in your room? What will you do?','linear-gradient(#ff8c00,#ff4500)','Eat it','Ignore it','I ate a marker.','I ignored a marker I found.',
          function()
          {
              you['health']-=2
              you['smarts']-=2
          },
          function()
          {
              you['smarts']+=2
          }],
      ],
      "child":[
          ['Toys!','You found a toy on the ground? Will you take it?','linear-gradient(#ff8c00,#ff4500)','Take the toy','Ignore it','I took a toy that I found on the ground.','I ignored a cool toy I saw on the ground.',
          function()
          {
              you['happy']+=2
          },
          function()
          {
              you['happy']-=1
          }],
          ['Cigarette!','A classmate at school comes up to you with a Cigarette, will you take a puff?','linear-gradient(#ff8c00,#ff4500)','Take a puff','Ignore him','I took a puff of a cigarette.','I refused to do drugs.',
          function()
          {
              you['stoned']+=1
          },
          function()
          {
              you['health']+=1
          }],
      ],
      "teen":[
          ['Drugs!','Someone offered you some weed, What will you do?','linear-gradient(#ff8c00,#ff4500)','Take the weed','Run Away','I smoked weed','I ran away when someone offered me weed.',function()
          {
              you['health']-=2;
              you['smarts']-=2;
              you['stoned']+=4;
          },
          function()
          {
              you['happy']-=1;
              you['smarts']+=2;
          }],
          ['Party!','While at a party a you have a chance to take a person to bed. Will you do it?','linear-gradient(#d75eff,#f00e9d)','You know it','Hell no','I took someone to bed while at a party','I rejected someone.',function()
          {
              lovers++;
              you['health']--;
              you['happy']++
          },
          function()
          {
              you['happy']-=1
              you['health']++;
          }],
          ['Party!','Someone invited you to a party, What will you do?','linear-gradient(#ff8c00,#ff4500)','Go to the party','Run Away','I went to a party!','I avoided going to a party',function()
          {
              you['happy']+=3
              you['health']-=1
              you['smarts']-=1
          },
          function()
          {
              you['happy']-=1
              you['smarts']+=1
          }],
          ['Classmate!','Your classmate was using your paper to cheat, what will you do?','linear-gradient(#ff8c00,#ff4500)','Allow them to cheat','Turn them in','I let my classmate cheat off of me.','I turned my classmate in for cheating off my paper.',function()
          {
              you['happy']+=2
              you['smarts']-=1
          },
          function()
          {
              you['happy']-=1
              you['smarts']+=1
          }],
          ['School!','You forgot to do your homework!','linear-gradient(#ff8c00,#ff4500)','Admit it to the teacher','Copy off other classmate','I was honest about not doing my homework.','I copied off the student next to me.',function()
          {
              you['happy']-=2
              you['grades']-=2
          },
          function()
          {
              you['happy']+=1
              you['grades']+=2
          }]
      ],
      "prison":[
          ['Prison!','Someone offered you cocaine in prison? What will you do?','linear-gradient(#ff8c00,#ff4500)','Take the cocaine','Say no','I snorted cocaine in prison.','I ignored someone who offered me weed.',function()
          {
              you['happy']+=2
              you['health']-=5
              you['stoned']+=10
          },
          function()
          {
              //nothing happens
          }],
          ['Shank!','Someone was holding a shank? What will you do?','linear-gradient(#ff8c00,#ff4500)','Report to the guard','Ignore it','I snitched on someone.','I minded my own business when I saw someone with a shank.',function()
          {
              //nothing happened
          },
          function()
          {
              //nothing happened
          }],
      ],
      "adult":[
          ['Drugs!','Someone offered you some weed, What will you do?','linear-gradient(#ff8c00,#ff4500)','Take the weed','Run Away','I smoked weed','I ran away when someone offered me weed.',function()
          {
              you['happy']+=2
              you['stoned']+=5
          },
          function()
          {
              you['happy']-=1
              you['smarts']+=2
          }],
          ['Crimes!','You saw a naked homeless man running around? What will you do?','linear-gradient(#ff8c00,#ff4500)','Call the cops','Walk away','I called the cops on a naked homeless man.','I walked away from a naked homeless man on the streets.',function()
          {
              you['happy']+=2
          },
          function()
          {
              //nothing happened
          }],
          ['What?!','Someone asked you if they can punch you in the face? What will you do?','linear-gradient(#ff8c00,#ff4500)','Of Course!','Ignore them','I let someone punch me in the face.','I ignored a crazy person.',function()
          {
              you['health']-=4
              you['happy']+=2
          },
          function()
          {
              //nothing happens
          }],
      ]
  }
  let motherAlive;
  
  
  $("#activities").hide();
  
  let compliments = 'stellar,awesome,chill,funny,nice,lit,super,fun,cool';compliments=compliments.split(',');
  let hungOutDo = 'went fishing,went exploring abandoned caves,went surfing,went skating,went swimming,ate at a fancy restaurant,watched a movie,went on a hike,walked on the beach,went for a walk,went to the park';hungOutDo=hungOutDo.split(',');
  let argueAbout = 'who has more money,who is cooler,Lil Tecca,music types';argueAbout=argueAbout.split(',');
  let meanWords = 'lame,stupid,ugly,annoying,moronic,idiotic,filthy,creepy';meanWords=meanWords.split(',');
  let deaths = 'a heart attack,a drug overdose,an ongoing health problem,a car accident';deaths=deaths.split(',');
  
  let movTitle1 = 'Journey,Recipe,Flight,Sanctuary,Home,Castle,Quick,Philosophy,Grasshopper,Day,Money,Dawn,Killer,Huskies,Leaves,Summer,Dark,Dance,Crying,Unmasking,The mask,Square,Kill the man';movTitle1=movTitle1.split(',');
  let movTitle2 = 'of hell,in time,of the zombies,in the dark,disaster,moon,maker,farmer,at dawn,in the sunlight,crash,room,of the penguins,to go,monday,Squid,of power,for you';movTitle2=movTitle2.split(',');
  let bodyParts = `kneecap,bellybutton,finger,chest,neck,leg,arm,fist,tongue,belly,eyes,back,face`;bodyParts=bodyParts.split(',');
  let attacks = `lacerated,crippled,broke,slapped,punched,bit,busted,crushed,spanked,headbutted,smashed,kicked,touched,popped,cut,shot,shanked,cracked,destroyed,drop-kicked`;attacks=attacks.split(',');
  let rumors = `are gay,have no friends,are a virgin,have herpes,have mental problems,are not mentally stable,are a murderer,have a tattoo of a dog crap`;rumors=rumors.split(',');
  
  let cliques =
  [
      {
          name: "Popular Kids",
          members:[],
          description: 'All the most popular kids are part of this clique.',
          popularityReq: randrange(20)+50,
          lookReq: 60,
          smartReq: 0
      },
      {
          name: "Nerds",
          members:[],
          description: 'This clique is only for the smartest kids in the school.',
          popularityReq: randrange(10)+4,
          lookReq: 0,
          smartReq: 50
      },
      {
          name: "Skater Kids",
          members:[],
          description: 'The most rebellious kids are part of this clique. You have to dedicate your life to skating.',
          popularityReq: randrange(20)+20,
          lookReq: 20,
          smartReq: 0
      },
      {
          name: "Gamer Kids",
          members:[],
          description: 'A clique of kids who love video games.',
          popularityReq: randrange(5)+5,
          lookReq: 0,
          smartReq: 0
      },
      {
          name: "Cool Kids",
          members:[],
          description: 'The coolest kids in the school.',
          popularityReq: randrange(20)+30,
          lookReq: 60,
          smartReq: 0
      },
      {
          name: "Surfer Kids",
          members:[],
          description: 'You have to live to surf to join this clique.',
          popularityReq: randrange(20)+10,
          lookReq: 30,
          smartReq: 0
      },
      {
          name: "Freaks",
          members:[],
          description: 'You to be a weirdo to join this clique.',
          popularityReq: randrange(5),
          lookReq: 0,
          smartReq: 0
      },
      {
          name: "Punks",
          members:[],
          description: 'They like punk rock and enjoy being rebellious.',
          popularityReq: randrange(10)+10,
          lookReq: 0,
          smartReq: 0
      },
      {
          name: "Cheerleaders",
          members:[],
          description: 'They love cheering and stuff.',
          popularityReq: randrange(20)+30,
          lookReq: 0,
          smartReq: 0
      },
      {
          name: "Jocks",
          members:[],
          description: 'They love football and stuff.',
          popularityReq: randrange(20)+30,
          lookReq: 0,
          smartReq: 0
      },
      {
          name: "Artsy Kids",
          members:[],
          description: 'They love to draw and do artsy things.',
          popularityReq: randrange(10)+4,
          lookReq: 0,
          smartReq: 0
      },
      {
          name: "Hippie Kids",
          members:[],
          description: 'To join this clique you must love peace and go to peace rallies.',
          popularityReq: randrange(10)+10,
          lookReq: 0,
          smartReq: 0
      },
  ]
  
  let sentence = 0;
  let bornDisease = 
  [
      {
          name: "Albinism",
          healthDown: 0,
          cureChance: 200,
          cost: 600,
          chanceAway: 2000
      },
      {
          name: "Progeria",
          healthDown: 2,
          cureChance: 1000,
          cost: 1000,
          chanceAway: 100000
      },
  ]
  let stds = 
  [
      {
          name: "Herpes",
          healthDown: 3,
          cureChance: 5,
          cost: 100,
          chanceAway: 100
      },
      {
          name: "HIV",
          healthDown: 10,
          cureChance: 30,
          cost: 300,
          chanceAway: 300
      },
      {
          name: "Chlamydia",
          healthDown: 3,
          cureChance: 10,
          cost: 300,
          chanceAway: 300
      },
      {
        name: "Genital Warts",
        healthDown: 2,
        cureChance: 3,
        cost: 100,
        chanceAway: 200
    },
    {
        name: "Gonorrhea",
        healthDown: 4,
        cureChance: 9,
        cost: 200,
        chanceAway: 300
    },
  ]
  let diseases = 
  [
      {
          name: "Cancer",
          healthDown: 30,
          cureChance: 10,
          cost: 500,
          chanceAway: 200
      },
      {
          name: "Ebola",
          healthDown: 16,
          cureChance: 10,
          cost: 100,
          chanceAway: 200
      },
      {
          name: "Flu",
          healthDown: 2,
          cureChance: 2,
          cost: 30,
          chanceAway: 3
      },
      {
          name: "Corona Virus",
          healthDown: 6,
          cureChance: 4,
          cost: 60,
          chanceAway: 5
      },
      {
        name: "Chicken Pox",
        healthDown: 3,
        cureChance: 3,
        cost: 60,
        chanceAway: 4
      },
      {
        name: "Black Death",
        healthDown: 20,
        cureChance: 60,
        cost: 300,
        chanceAway: 500
      },
      {
        name: "Measles",
        healthDown: 2,
        cureChance: 3,
        cost: 50,
        chanceAway: 5
      }
  ]
  
  let you = 
  {
      age: 0,
      relationships: [],
      money: 0,
      health: randrange(100),
      happy: randrange(100),
      looks: randrange(100),
      smarts: randrange(100),
      events: [],
      inPrison: false,
      items: [],
      career: 'none',
      prisonYears: 0,
      salary: 0,
      spot: 0,
      dead: false,
      collegePoints: 0,
      term: 0,
      payYear: 0,
      pointsCollege: 0,
      jobSal: 0,
      fame: 0,
      books: [],
      songs: [],
      stoned: 0,
      diseases: [],
      school: {
          "name":'',
          "teachers":[],
          "classmates":[],
          "grade":randrange(100),
          "popularity":randrange(100)
      },
      fights: 0,
      rap_sheet: [],
      addictions: [],
      oldAddictions: [],
      movies: [],
      payingOff: [],
      comedy: randrange(50),
      cars: [],
      driversLicense: false,
      gems: []
  }
  
  you['gender']=choice(genders);
  
  // Prompt user for character name
  let playerName = prompt('What would you like to name your character?', '');
  if (playerName && playerName.trim() !== '') {
      // Use player's chosen name
      let nameParts = playerName.trim().split(' ');
      if (nameParts.length >= 2) {
          you['first_name'] = nameParts[0];
          you['last_name'] = nameParts.slice(1).join(' ');
      } else {
          you['first_name'] = nameParts[0];
          you['last_name'] = choice(lNames);
      }
  } else {
      // Use random name if player doesn't provide one
      if(you['gender']=='Male'){you['first_name']=choice(mNames);}
      else{you['first_name']=choice(fNames);}
      you['last_name']=choice(lNames);
  }
  
  you['full_name']=`${you['first_name']} ${you['last_name']}`;
  
  $(".name").html(you['full_name']);
  
  motherAlive=randrange(4);
  if(motherAlive>-1){
      let motherObj={
          first_name: choice(fNames),
          last_name: you['last_name'],
          gender: 'Female',
          age: randrange(30) + 20,
          status: 'mother',
          relation: randrange(100),
          money: randrange(40000),
          blood: true,
          health: randrange(100),
          happy: randrange(100),
          smarts: randrange(100),
          looks: randrange(100),
          dead: false,
      }
      if (randrange(3)==1){
          motherObj['career']='none'
      }
      else{
          if (motherObj['age'] >= 18){
              motherObj['career']=choice(careers)
          }
          else{
              motherObj['career']='none'
          }
      }
      motherObj['full_name']=`${motherObj['first_name']} ${motherObj['last_name']}`,
      you['relationships'].push(motherObj);
  }
  
  motherAlive=randrange(4);
  if(motherAlive!=1){
      let fatherObj={
          first_name: choice(mNames),
          last_name: you['last_name'],
          gender: 'Male',
          age: randrange(30) + 20,
          status: 'father',
          relation: randrange(100),
          money: randrange(40000),
          blood: true,
          health: randrange(100),
          happy: randrange(100),
          smarts: randrange(100),
          looks: randrange(100),
      }
      if (randrange(3)==1){
          fatherObj['career']='none'
      }
      else{
          if (fatherObj['age'] >= 18){
              fatherObj['career']=choice(careers)
          }
          else{
              fatherObj['career']='none'
          }
      }
      fatherObj['full_name']=`${fatherObj['first_name']} ${fatherObj['last_name']}`,
      you['relationships'].push(fatherObj);
  }
  
  for (let x = 0; x!=3; x++){
      if (randrange(3)==1){
          let siblingObj={
              age: randrange(10),
              relation: randrange(100),
              money: randrange(1000),
              blood: true,
              health: randrange(100),
              happy: randrange(100),
              smarts: randrange(100),
              looks: randrange(100)
          }
          siblingObj['gender']=choice(genders);
          if (siblingObj['gender']=='Male'){
              siblingObj['first_name']=choice(mNames);
              siblingObj['status']='brother';
  
          }else{
              siblingObj['first_name']=choice(fNames);
              siblingObj['status']='sister';
          }
          if (siblingObj['age'] < 18){
              siblingObj['career']='none'
          }
          else{
              siblingObj['career']=choice(careers)
          }
          
          siblingObj['last_name']=you['last_name'];
          siblingObj['full_name']=`${siblingObj['first_name']} ${siblingObj['last_name']}`,
          you['relationships'].push(siblingObj);
      }
  }
  
  if (randrange(100)==1){
      you['diseases'].push(choice(bornDisease));
  }
  $("#activities").hide();
  $("#relationships").hide();
  $('#leave').hide();
  $("#prisonButtons").hide();
  $("#playAgain").hide();
  $("#careers").hide();
  $("#finance").hide();
  $("#youInfo").hide();
  $("#summary").hide();
  $("#popup").hide();
  $("#buttons2").hide()
  $("#popup2").hide();
  $("#fameThing").hide();
  $("#fameThing2").hide();
  $("#prisonLeave").hide();
  
  houseTypes = 
  [
      {"name":"House",
      "range":600000,
      "low": 60000,
      "hapEff":2,
      "helEff":2},
      {"name":"Shack",
      "range":20000,
      "low": 20000,
      "hapEff":0,
      "helEff":0},
      {"name":"Mansion",
      "range":8000000,
      "low": 1000000,
      "hapEff":3,
      "helEff":3},
      {"name":"Cottage",
      "range":300000,
      "low": 50000,
      "hapEff":1,
      "helEff":1},
      {"name":"Billionaire Mansion",
      "range":100000000,
      "low": 10000000,
      "hapEff":4,
      "helEff":4},
      {"name":"Condo",
      "range":400000,
      "low": 100000,
      "hapEff":2,
      "helEff":2},
      {"name":"Bungalow",
      "range":600000,
      "low": 90000,
      "hapEff":2,
      "helEff":2},
      {"name":"Castle",
      "range":300000,
      "low": 6000000,
      "hapEff":3,
      "helEff":3},
      {"name":"Yurt",
      "range":20000,
      "low": 5000,
      "hapEff":-1,
      "helEff":-1},
      {"name":"Château",
      "range":600000,
      "low": 5000000,
      "hapEff":2,
      "helEff":2},
      {"name":"Palace",
      "range":5000000000,
      "low": 5000000,
      "hapEff":5,
      "helEff":5},
      {"name":"Hut",
      "range":10000,
      "low": 1000,
      "hapEff":-2,
      "helEff":-1},
      {"name":"Log Cabin",
      "range":275000,
      "low": 50000,
      "hapEff":2,
      "helEff":2},
      {"name":"Apartment",
      "range":0,
      "low": 0,
      "hapEff":0,
      "helEff":0},
  ]
  
  typesGems = 'Ring,Necklace,Bracelet,Watch,Chain,Earings';typesGems=typesGems.split(',');
  
  rangeIt = (low, max) => {
      let listNew = []
      for(let x = low; x < max; x++){
          listNew.push(x);
      }
      return listNew;
  }
  
  gemTypes = [
      {
          "name":'Turquoise',
          "costAdd":rangeIt(1000, 2000),
          "hapAdd":2,
      },
      {
          "name":'0.3ct Diamond',
          "costAdd":rangeIt(100, 1500),
          "hapAdd":1,
      },
      {
          "name":'2ct Diamond',
          "costAdd":rangeIt(5000, 60000),
          "hapAdd":5,
      },
      {
          "name":'4ct Diamond',
          "costAdd":rangeIt(30000, 250000),
          "hapAdd":7,
      },
      {
          "name":'7ct Diamond',
          "costAdd":rangeIt(90000, 900000),
          "hapAdd":9,
      },
      {
          "name":'2ct Ruby',
          "costAdd":rangeIt(2000, 20000),
          "hapAdd":5,
      },
      {
          "name":'Fake Diamond',
          "costAdd":rangeIt(1, 50),
          "hapAdd":0,
      },
      {
          "name":'Fake Ruby',
          "costAdd":rangeIt(1, 20),
          "hapAdd":0,
      },
      {
          "name":'Fake Turquoise',
          "costAdd":rangeIt(1, 20),
          "hapAdd":0,
      },
      {
          "name":'3ct Emerald',
          "costAdd":rangeIt(25000, 40000),
          "hapAdd":6,
      },
      {
          "name":'10ct Emerald',
          "costAdd":rangeIt(10000, 150000),
          "hapAdd":9,
      },
      {
          "name":'Fake Emerald',
          "costAdd":rangeIt(1, 100),
          "hapAdd":0,
      },
      {
          "name":'14k Gold',
          "costAdd":rangeIt(10000, 20000),
          "hapAdd":0,
      }
  ]
  
  carTypes = [
      {
          "name":"Ford Ranger",
          "years":rangeIt(1964, 2021),
          "costs":rangeIt(25000, 30000),
          "hapEff":6
      },
      {
          "name":"Dodge Challenger",
          "years":rangeIt(1970, 2021),
          "costs":rangeIt(26000, 36000),
          "hapEff":6
      },
      {
          "name":"Ford Mustang",
          "years":rangeIt(1970, 2021),
          "costs":rangeIt(27000, 50000),
          "hapEff":10
      },
      {
          "name":"Subaru Outback",
          "years":rangeIt(1994, 2021),
          "costs":rangeIt(20000, 45000),
          "hapEff":6
      },
      {
          "name":"Fiat 500",
          "years":rangeIt(1957, 2021),
          "costs":rangeIt(10000, 20000),
          "hapEff":4
      },
      {
          "name":"Honda Pilot",
          "years":rangeIt(2003, 2021),
          "costs":rangeIt(30000, 40000),
          "hapEff":7
      },
      {
          "name":"Kia Rio",
          "years":rangeIt(1999, 2021),
          "costs":rangeIt(10000, 20000),
          "hapEff":7
      },
      {
          "name":"Lamborghini Aventador SVJ",
          "years":rangeIt(2020, 2021),
          "costs":rangeIt(300000, 500000),
          "hapEff":10
      }
  ]
  
  gems = [];
  for(let i = 0; i < randrange(60)+30; i++){
      gemType = choice(gemTypes);
  
      let gemObj = {
          "name": gemType['name'] + ' ' + choice(typesGems),
          "cost": choice(gemType['costAdd']), 
          "hapEff": randrange(gemType['hapAdd']) + 1,
          "own":false
      }
  
      gems.push(gemObj);
  }
  
  cars = []
  
  for (let x = 0; x < randrange(60)+30; x++){
      carType = choice(carTypes);
      carYear = choice(carType['years']);
      carCost = choice(carType['costs']);
      yearsOn = 2021 - carYear;
      carCost += yearsOn * 15
      carObj = 
      {
          "name":carYear + ' ' + carType['name'],
          "cost":carCost,
          "hapEff":randrange(carType['hapEff']),
          "own": false
      }
      cars.push(carObj);
  }
  
  located = ['lane','avenue','street','road','hills','mountains','lake']
  
  houses=[];
  
  for(let x = 0; x < randrange(60)+30; x++){
      using = choice(houseTypes);
      cost = randrange(using['range'])+using['low']
      let houseObj = {
          "name":`${using['name']} on `+choice(lNames)+` ${choice(located)}`,
          "cost": cost,
          "yearly": Math.floor(cost * 0.1),
          "health":randrange(using['helEff']),
          "happy":randrange(using['hapEff']),
          "own":false
      }
      if (using['name'] == 'Apartment'){
          houseObj['yearly']=randrange(15000)+2000
      }
      houses.push(houseObj)
  }
  
  careers = careers.sort(()=>Math.random()-0.5);
  activities = activities.sort(()=>Math.random()-0.5);
  colleges = colleges.sort(()=>Math.random()-0.5);
  houses = houses.sort(()=>Math.random()-0.5);
  cliques = cliques.sort(()=>Math.random()-0.5);
  
  let taxPay = 0;
  let bookYear = false;
  let schoolDistrict = choice(lNames);
  let vev = 0;
  let oked = true;
  
  let prisonInmates = [];
  for(let x = 0; x < 30; x++){
    let inmateObj={
          last_name: choice(lNames),
          gender: you['gender'],
          age: randrange(30) + you['age'],
          status: 'inmate',
          relation: randrange(10),
          money: randrange(1000),
          blood: false,
          health: randrange(50),
          happy: randrange(50),
          smarts: randrange(50),
          looks: randrange(50),
      }
      if (you['gender'] == 'Male'){
        inmateObj['first_name']=choice(mNames);
      }
      else{
        inmateObj['first_name']=choice(fNames);
      }
      inmateObj['full_name']=inmateObj['first_name'] + ' ' + inmateObj['last_name'];
    prisonInmates.push(inmateObj);
  }
  
  function lessBig(head,text,color){
      leave();
      $("#popup2").html('');
      $('#events').hide()
      $("#popup2").show();
      $("#buttons").hide();
      $("#buttons2").show();
      $("#popup2").css('background',color)
      $("#popup2").html(`
          <center>
          <div class='poper'>
          <h1 id='head'>${head}</h1>
          <p id='text'>${text}</p>
          <br><br>
          <button class='button option big leaveOk2'>Ok</button>
          </center>
          </div>
      `);
      $(".leaveOk2").on('click',function(){
          if (you['dead']==false){
              leave();
              update();
          }
          else{
              dieLeave();
              $("#summary").show();
              $("#playAgain").show();
          }
      })
  }
  
  function importantNew(listName){
      $("#popup").html('');
      for(x in listName){
          if (listName[x] != undefined){
              if (listName[x].length < 4){
                  $("#events").hide();
                  $("#popup").show();
                  $("#buttons").hide();
                  $("#buttons2").show();
                  head = listName[x][0]
                  text = listName[x][1]
                  color = listName[x][2]
                  $("#popup").css('background',listName[0][2])
                  $("#popup").append(`
                      <center>
                      <div id='${x}popup' class='poper'>
                      <h1 id='head'>${head}</h1>
                      <p id='text'>${text}</p>
                      <br><br>
                      <button class='button option big leaveOk'>Ok</button>
                      <br><br><br><br><br><br><br><br><br><br><br>
                      </center>
                      </div>
                  `);
              }
              else{
                  $("#events").hide();
                  $("#popup").show();
                  $("#buttons").hide();
                  $("#buttons2").show();
                  itemNow = listName[x];
                  head = itemNow[0];
                  text = itemNow[1];
                  color = itemNow[2];
                  button1 = itemNow[3];
                  button2 = itemNow[4];
                  response1 = itemNow[5];
                  response2 = itemNow[6];
                  console.log(itemNow[7])
                  effectsObject = {"function":itemNow[7]};
                  effectsObject2 = {"function":itemNow[8]}
                  $("#popup").css('background', listName[0][2])
                  $("#popup").append(`
                      <div id='${x}popup' class='poper'>
                      <center>
                      <h1 id='head'>${head}</h1>
                      <p id='text'>${text}</p>
                      <br><br>
                      <button class='button option giant buttonClicked' data-did='7' id='${x}' data-effects='${effectsObject}' data-response='${response1}'>${button1}</button>
                      <br><br>
                      <button class='button option giant buttonClicked' data-did='8' id='${x}' data-effects='${effectsObject2}' data-response='${response2}'>${button2}</button>
                      <br><br><br><br><br><br><br><br><br>
                      </center>
                      </div>
              `);
              }
          }
      }
      on=0;
      $('.leaveOk').on('click',function(){
          if (on == listName.length-1){
              if (you['dead']==false){
                  leave();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              }
              else{
                  dieLeave();
                  $("#summary").show();
                  $("#playAgain").show();
              }
          }
          $(`#${on}popup`).remove();
          on++;
          if (on < listName.length){
              $("#popup").css('background',listName[on][2])
          }
      })
      $(".buttonClicked").on('click',function(){
          $("#events").append(`<br><sh class='event'>${$(this).attr('data-response')}</sh>`);
          effects = $(this).attr('data-effects');
  
          eventCurrent = listName[Number($(this).attr('id'))]
          
          eventCurrent[Number($(this).attr('data-did'))]();
  
          if (you['happy']>100){you['happy']=100}
          if (you['health']>100){you['health']=100}
          if (you['happy']<0){you['happy']=0}
          if (you['health']<0){you['health']=0}
  
          if (on == listName.length-1){
              if (you['dead']==false){
                  leave();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              }
              else{
                  dieLeave();
                  $("#summary").show();
                  $("#playAgain").show();
              }
          }
          $(`#${on}popup`).remove();
          on++
          if (on < listName.length){
              $("#popup").css('background',listName[on][2])
          }
  
      })
  }
  
  function isSingle(list){
    for(x in list){
      t = list[x]['status']
      l =list[x]
      if (t=='wife'||t=='husband'||t=='girlfriend'||t=='boyfriend'||t=='fiance'){
        return l;
      }
      else{
        return false;
      }
    }
  }  
  
  function newSchoolPeople(teachers,students,other){
      you['school']['teachers']=[]
      you['school']['classmates']=[]
      you['school']['clique']='none';
      for(x in cliques){
          cliques[x]['members']=[];
      }
      you['school']['name']=schoolDistrict+`'s `+other
      for(let x = 0; x != teachers; x++){
          teacherGender = choice(genders);
          let teacherObj = 
          {
              age: randrange(40)+22,
              gender: teacherGender,
              money: randrange(10000),
              happy: randrange(100),
              health: randrange(100),
              looks: randrange(100),
              smarts: randrange(50)+50,
              relation: randrange(100),
              blood: false,
              status: 'teacher'
          }
          if (teacherGender=='Male'){
              teacherObj['first_name']=choice(mNames);
          }else{
              teacherObj['first_name']=choice(fNames);
          }
          teacherObj['last_name']=choice(lNames);
          teacherObj['full_name']=teacherObj['first_name']+' '+teacherObj['last_name']
          you['school']['teachers'].push(teacherObj);
      }
      for(let x = 0; x != students; x++){
          studentGender = choice(genders);
          let studentObj = 
          {
              age: you['age'],
              gender: studentGender,
              money: randrange(500),
              happy: randrange(100),
              health: randrange(100),
              looks: randrange(100),
              smarts: randrange(50)+50,
              relation: randrange(100),
              blood: false,
              status: 'classmate',
              popularity: randrange(100),
              clique: 'none'
          }
          if (studentGender=='Male'){
              studentObj['first_name']=choice(mNames);
          }else{
              studentObj['first_name']=choice(fNames);
          }
          console.log(cliques);
          studentObj['last_name']=choice(lNames);
          studentObj['full_name']=studentObj['first_name']+' '+studentObj['last_name']
          you['school']['classmates'].push(studentObj);
          for (i in cliques){
              cliqueNow = cliques[i];
              if (studentObj['clique']=='none'){
                  if (studentObj['popularity'] > randrange(50)+cliqueNow['popularityReq']){
                      if (randrange(2)==1){
                          studentObj['clique']=cliqueNow['name'];
                          cliqueNow['members'].push(studentObj)
                      }
                  }
              }
          }
      }
  }
  
  function die(){
      listOfEvents=[];
      listOfEvents.push(['Death!','You Died!','linear-gradient(#000000,#2e0909)'])
      importantNew(listOfEvents);
      $("#buttons").hide();
      $("#prisonButtons").hide();
      $("body").css('background','red');
      $("#events").hide();
      eventsHtml = document.getElementById('events').innerHTML;
      you['dead']=true;
      let summary = `You died, here is your life summary.`
      if (you['gender']=='Male'){
          talkAbout = 'He'
          talkAbout2 = 'his'
      }
      else{
          talkAbout = 'She'
          talkAbout2 = 'her'
      }
  
      if (you['age']>=40&&you['happy']>50){
          summary += `<br><br>${you['full_name']} lived a long and happy life. Dying at the age of ${you['age']}. `
      }
      else if (you['age'] > 40 && you['happy']<=50){
          summary += `<br><br>${you['full_name']} lived a long not so happy life, dying at the age of ${you['age']}. `
      }
      else if (you['age'] <= 40){
          summary += `<br><br>${you['full_name']} lived a short life, dying at the ripe age of ${you['age']}. `
      }
  
      single=true;
      mainAmount = undefined;
      for(x in you['relationships']){
          currentRel = you['relationships'][x];
          if (currentRel['status']=='girlfriend'||currentRel['status']=='boyfriend'||currentRel['status']=='wife'||currentRel['status']=='husband'||currentRel['status']=='fiance'){
              single = false;
              relationWith = currentRel['full_name']
              relationStatus = currentRel['status']
              mainAmount = currentRel['relation']
          }
      }
      if (single && lovers == 0){
          summary += `${talkAbout} never had time to fall in love, ${talkAbout} died alone. `
      }else{
          if (mainAmount > 70 && mainAmount != undefined){
              summary += `${talkAbout} was in love with ${talkAbout2}  ${relationStatus}, ${relationWith}. `
          }
          else if(mainAmount != undefined){
              summary += `${talkAbout} was not close with ${talkAbout2} ${relationStatus}, ${relationWith}, but ${talkAbout} was not alone. `
          }
      }
  
      if (totalStoned < 15 && totalStoned > 0){
          summary += `${talkAbout} experimented with drugs but never got to into them. `
      }
  
      if (totalStoned >= 15){
          summary += `${talkAbout} did a lot of drugs. `  
      }
  
      if (lovers == 0 && you['age'] > 15){
          summary += `${talkAbout} was a virgin. `  
      }
  
      if (lovers >= 25){
          summary += `${talkAbout} was a bit of a slut. `  
      }
  
      if (you['diseases'].length > 0){
          summary += `${talkAbout} supposedly died from complications that arose from their struggle with ${you['diseases'][0]['name']}. `
      }
  
      if (you['looks'] > 70 && lovers > 2){
          summary += `${talkAbout} was a very good looking person, ${talkAbout} had no problem asking people out. `
      }
      else if (you['looks'] > 70){
          summary += `${talkAbout} was a very good looking person. `
      }
  
      if (you['smarts'] > 70 && you['age'] > 10){
          summary += `${talkAbout} was a genius, people would ask ${talkAbout2} for help on any kind of work that involved the brain. `
      }
  
      if (you['relationships'].length > 5){
          summary += `${talkAbout} knew a lot of people. `
      }
  
      if (you['diseases'].length > 1){
          summary += `${talkAbout} was sick with several diseases. `
      }
      if (you['prisonYears'] < 1 && murders > 0){
          summary += `${talkAbout} was a very sneaky person, and got away with crime easily. `
      }
      if (you['prisonYears'] > 5){
          summary += `${talkAbout} spent a lot of time in prison. `
      }
      else if (you['prisonYears'] > 0){
          summary += `${talkAbout} spent some time in the clink. `
      }
  
      for(x in you['relationships']){
          if (you['relationships'][x]['relation'] > 60){
              summary += `${talkAbout} was very close with ${talkAbout2} ${you['relationships'][x]['status']}, ${you['relationships'][x]['full_name']}. `
          }
          if (you['relationships'][x]['relation'] < 15){
              summary += `${talkAbout} hated ${talkAbout2} ${you['relationships'][x]['status']}, ${you['relationships'][x]['full_name']}. `
          }
      }
  
      if (you['money'] > 500000){
          summary += `${talkAbout} had a load of money. `
      }
  
      if (murders == 1){
          summary += `${talkAbout} never could forget the time ${talkAbout} killed someone. `
      }
  
      if (murders > 1){
          summary += `${talkAbout} killed people. `
      }
      else if(murders > 5){
        summary += `${talkAbout} killed a load of people. `
      }
  
      if (you['fights'] > 5){
          summary += `${talkAbout} got into a lot of fights. `
      }
  
      if (you['fame'] > 1000){
          summary += `${talkAbout} was considered famous by many. `
      }
  
      summary += `<br><br>Money: <span style='color:#03c400;font-weight:bolder'>$${comify(you['money'])}</span><br>Age:  <span style='color:#f75700;font-weight:bolder'>${you['age']}</span><br>Lovers:  <span style='color:#d75eff;font-weight:bolder'>${lovers}</span><br>Murders:  <span style='color:#ff3903;font-weight:bolder'>${murders}</span><br>Years in Prison:  <span style='color:#ff3903;font-weight:bolder'>${you['prisonYears']}</span>`
  
      let trophy = 'Average 🙂'
      if (lovers>10){
          trophy = 'Love Bird 💖'
      }
      if (you['relationships'].length <= 0){
          trophy = 'Lonely 💔'
      }
      if (you['books'].length > 0){
          trophy = 'Writer 📝'
      }
      if (you['fights']>10){
          trophy = 'Fighter 🥊'
      }
      if (murders>1){
        trophy = 'Evil 😈'
      }
      if (you['career']=='doctor'){
          trophy = 'Genius 👨‍⚕️'
      }
      if (you['collegePoints']>0){
          trophy = 'Educated 🏫'
      }
      if (you['diseases'].length > 1){
        trophy = 'Sick 🤢'
      }
      if (lovers>50){
        trophy = 'Lustfull 👄'
    }
      if (you['addictions'].length > 1){
          trophy = 'Addict 💊'
      }
      if (you['money']>500000){
          trophy = 'Rich 🤑'
      }
      else if (you['money']>1000000){
          trophy = 'Filthy Rich 💰'
      }
      if (you['prisonYears']>5){
          trophy = 'Jail Bird 🚔'
      }
      if (you['prisonYears'] > 10){
          trophy = 'Criminal 🚨'
      }
      if (totalStoned>40){
          trophy = 'Stoner 🌿'
      }
      if (totalStoned>100){
          trophy = 'Tweaker 💉'
      }
      if (murders>10){
        trophy = 'Killer 🔪'
      }
      if (you['fame'] > 5000){
          trophy = 'Famous 📷'
      }

      you['school']={}
      you['trophy']=trophy
      you['events']='';
      you['relationships']=[]
      you['books']=you['books'].length;
      you['songs']=you['songs'].length;
      you['summary']=summary;
      you['murders']=murders;
      you['lovers']=lovers;
      you['addictions']=[];
      you['diseases']=[];
      you['cars']=[];
      you['items']=[];
      you['movies']=[];

      save(you);
  
      summary += `<br><h1>${trophy}</h1>`
  
      let on = 0;
      $("#summary").html('');
      soFar = '';
  
      $("#summary").html(summary)
      $("#summary").append(`
        <center><div class='miniEvents'>
            ${eventsHtml}
        </div></center>
      `)
  }
  
  function update(){
      if (you['school']['grade']>100){you['school']['grade']=100}
      if (you['school']['grade']<0){you['school']['grade']=0}
      if (you['happy']<0){you['happy']=0};
      if (you['looks']<0){you['looks']=0};
      if (you['smarts']<0){you['smarts']=0};
      if (you['health']>100){you['health']=100};
      if (you['happy']>100){you['happy']=100};
      if (you['looks']>100){you['looks']=100};
      if (you['smarts']>100){you['smarts']=100};
      if (you['comedy']>100){you['comedy']=100};
      $("#looks").css('width',you['looks']+'px');
      $("#happy").css('width',you['happy']+'px');
      $("#smarts").css('width',you['smarts']+'px');
      $("#health").css('width',you['health']+'px');
      $("#comedy").css('width',you['comedy']+'px');
      if (you['fame'] > 0){
          $("#fameThing").show();
          $("#fameThing2").show();
          $("#fameBar").css('width',(you['fame']/200)+'px');
          if (you['fame'] > 20000){
              $("#fameBar").css('width',(100)+'px');
          }
      }
      else{
          $("#fameThing").hide();
          $("#fameThing2").hide();
      }
      $(".money").html('$'+comify(you['money']));
      if (you['health']<=0){
          you['health']=0
          if (randrange(3)==1){
              $("#events").append(`<br><sh class='event'>I died from health problems</sh>`);
              die();
          }
      }
      else if (you['age']>=randrange(40)+80){
        if (randrange(3)==1){
          $("#events").append(`<br><sh class='event'>I died from old age.</sh>`);
            die();
        }
      }
      var objDiv = document.getElementById("events");
      objDiv.scrollTop = objDiv.scrollHeight;
  }
  
  update();
  
  for(x in you['relationships']){
      relationNowIs = you['relationships'][x];
      if (relationNowIs['career']=='none'){
          $("#events").append(`
          <br>
          <sh class='event'>My ${you['relationships'][x]['status']} is ${you['relationships'][x]['full_name']} (age ${relationNowIs['age']})</sh>
          `)
      }
      else{
          $("#events").append(`
          <br>
          <sh class='event'>My ${you['relationships'][x]['status']} is ${you['relationships'][x]['full_name']}, a ${relationNowIs['career']['title']} (age ${relationNowIs['age']})</sh>
          `) 
      }
  }
}
  
  $(".name").on('click',function(){
      if (you['dead']==false && you['inPrison'] == false){
          leave();
          $("#youInfo").show();
          $("#buttons").hide();
          $("#leave").show();
          $("#youInfo").html('');
          $("#events").hide();
          $("#youInfo").append(`
              <center><div id='yourInfoAndSuch'>
                  <h1>${you['full_name']}</h1>
                  <p>Gender: <span style='color:orange;font-weight:bolder;'>${you['gender']}</span></p>
                  <p>Money: <span style='color:green;font-weight:bolder;'>$${comify(you['money'])}</span></p>
                  <p>Career: <span style='color:orange;font-weight:bolder;'>${you['career']}</span></p>
                  <p>Age: <span style='color:orange;font-weight:bolder;'>${you['age']}</span></p>
                  <p>Health: <span style='color:green;font-weight:bolder;'>${you['health']}%</span></p>
                  <p>Looks: <span style='color:green;font-weight:bolder;'>${you['looks']}%</span></p>
                  <p>Happiness: <span style='color:green;font-weight:bolder;'>${you['happy']}%</span></p>
                  <p>Smarts: <span style='color:green;font-weight:bolder;'>${you['smarts']}%</span></p>
                  <p>Lovers: <span style='color:purple;font-weight:bolder;'>${lovers}</span></p>
                  <p>Murders: <span style='color:red;font-weight:bolder;'>${murders}</span></p>
                  <p>Fame: <span style='color:green;font-weight:bolder;'>${you['fame']}</span></p>
                  <button class='hang schoolbox' id='theme'>Change Theme</button>
              </div></center>
          `)
  
          $("#theme").on('click',function(){
            if ($("#style").attr('href')=='style.css'){
              $("#style").attr('href','dark.css')
            }
            else{
              $("#style").attr('href','style.css')
            }
          })
  
          if (you['diseases'].length > 0){
              $("#yourInfoAndSuch").append(`
                <h2>Your Diseases</h2>
              `)
              for(x in you['diseases']){
                  let mainDisease = you['diseases'][x];
                  $("#yourInfoAndSuch").append(`
                      <div class='disease'>
                          <h3>${mainDisease['name']}</h3>
                          <button class='hang saveLife' id='${x}'>Get Treatment<br><small>Cost: $${comify(mainDisease['cost'])}</small></button>
                      </div>
                  `)
              }
          }
  
          if (you['addictions'].length > 0){
              $("#yourInfoAndSuch").append(`
                      <h2>Your Addictions</h2>
                  `)
              for(x in you['addictions']){
                  let addictionRn = you['addictions'][x];
                  $("#yourInfoAndSuch").append(`
                      <div class='addiction'>
                          <h3>${addictionRn['name']}</h3>
                          <button class='hang schoolbox rehabDrugs' id='${x}'>Rehab<br><small>Cost: $1,000</small></button>
                      </div>
                  `)
              }
          }
  
          $(".rehabDrugs").on('click',function(){
              currentDrug = you['addictions'][Number($(this).attr('id'))];
              if (you['money'] >= 1000){
                  you['money']-=1000;
                  $("#events").append(`<br><sh class='event'>I went to rehab.</sh>`);
                  if (randrange(currentDrug['rehabChance']) == 1){
                      you['oldAddictions'].push(currentDrug);
                      you['addictions'].splice(Number(($(this).attr('id'))))
                      you['stoned']-=randrange(Math.floor(you['stoned']/3))
                      $("#events").append(`<br><sh class='event'>I no longer am addicted to ${currentDrug['name']}.</sh>`);
                      lessBig('Success!',`You are no longer addicted to ${currentDrug['name']}`,'linear-gradient(#42C0FB, #4AC948)')
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>Rehab was a failure.</sh>`);
                      leave()
                  }
              }
              else{
                  $("#events").append(`<br><sh class='event'>I can't afford to go to rehab.</sh>`);
                  leave();
              }
              update();
          })
  
          $(".saveLife").on('click',function(){
              let thisDisease = you['diseases'][Number($(this).attr('id'))];
              if (you['money'] >= thisDisease['cost']){
                  you['money']-=thisDisease['cost'];
                  $("#events").append(`<br><sh class='event'>I got treatment for my ${thisDisease['name']} disease.</sh>`);
                  if (randrange(thisDisease['cureChance'])==1){
                      $("#events").append(`<br><sh class='event'>I was cured for ${thisDisease['name']}!</sh>`);
                      lessBig('Cured!',`You were cured for ${thisDisease['name']}`,'linear-gradient(#42C0FB, #4AC948)')
                      you['diseases'].splice(Number($(this).attr('id')),1);
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>I continue to suffer from ${thisDisease['name']}!</sh>`);
                      leave()
                  }
              }
              else{
                  $("#events").append(`<br><sh class='event'>I can't afford treatment for ${thisDisease['name']}!</sh>`);
                  leave()
              }
              update();
          })
          if (you['books'].length > 0){
              maxTotalBooks=0;
              for(x in you['books']){
                  bookNow = you['books'][x];
                  maxTotalBooks += bookNow['totalEarned'];
              }
              $("#yourInfoAndSuch").append(`
              <h2>Your Books</h2>
              <p>Total Money from Your books $${comify(maxTotalBooks)}</p>
              `)
              for(x in you['books']){
                  bookNow = you['books'][x];
                  expectedValue = Math.floor(bookNow['totalEarned'] + (((60-you['age'])*bookNow['maxMoney'])/3));
                  $("#yourInfoAndSuch").append(`
                      <div class='bookInf'>
                          <h3>${bookNow['title']}</h3>
                          <p>Total Earned: <span style='color:green;font-weight:bolder;'>$${comify(bookNow['totalEarned'])}</span></p>
                          <p>Total Money Spent On: <span style='color:green;font-weight:bolder;'>$${comify(bookNow['totalSpent'])}</span></p>
                          <p>Expected Value: <span style='color:green;font-weight:bolder;'>$${comify(expectedValue)}</span></p>
                          <center>
                          <button class='hang advertiseBook' id='${x}'>Advertise<br><small>Cost: $100</small></button>
                          </center>
                      </div>
                  `)
              }
              $(".advertiseBook").on('click',function(){
                  if (you['money']>=100){
                      let bookOn = you['books'][Number($(this).attr('id'))];
                      if (bookOn['advertiseYear'] == false){
                          if (you['fame'] < 20000){
                              you['fame']+=randrange(you['fame']*0.1);
                              bookOn['maxMoney']+=randrange(you['fame']/2);
                          }
                          bookOn['advertiseYear']=true
                      }
                      you['money']-=100;
                      bookOn['totalSpent']+=100;
                      $("#events").append(`<br><sh class='event'>I advertised my book, "${bookOn['title']}"</sh>`);
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>I did not have the money to advertise my book, "${bookOn['title']}"</sh>`);
                  }
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          }
          if (you['songs'].length > 0){
              maxTotalSongs=0;
              for(x in you['songs']){
                  songNow = you['songs'][x];
                  maxTotalSongs += songNow['totalEarned'];
              }
              $("#yourInfoAndSuch").append(`
              <h2>Your Songs</h2>
              <p>Total Money from your Songs $${comify(maxTotalSongs)}</p>
              `)
              for(x in you['songs']){
                  songNow = you['songs'][x];
                  expectedValue = Math.floor(songNow['totalEarned'] + (((60-you['age'])*songNow['maxMoney'])/3));
                  $("#yourInfoAndSuch").append(`
                      <div class='bookInf'>
                          <h3>${songNow['title']}</h3>
                          <p>Total Earned: <span style='color:green;font-weight:bolder;'>$${comify(songNow['totalEarned'])}</span></p>
                          <p>Total Money Spent On: <span style='color:green;font-weight:bolder;'>$${comify(songNow['totalSpent'])}</span></p>
                          <p>Expected Value: <span style='color:green;font-weight:bolder;'>$${comify(expectedValue)}</span></p>
                          <center>
                          <button class='hang advertiseSong' id='${x}'>Advertise<br><small>Cost: $50</small></button>
                          </center>
                      </div>
                  `)
              }
              $(".advertiseSong").on('click',function(){
                  let songOn = you['songs'][Number($(this).attr('id'))];
                  if (you['money']>=50){
                      if (songOn['advertiseYear']==false){
                          if (you['fame'] < 20000){
                              you['fame']+=randrange(you['fame']*0.1);
                              songOn['maxMoney']+=randrange(you['fame']/2);
                          }
                          songOn['advertiseYear']=true
                      }
                      you['money']-=50;
                      songOn['totalSpent']+=50;
                      $("#events").append(`<br><sh class='event'>I advertised my song, "${songOn['title']}"</sh>`);
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>I did not have the money to advertise my song, "${songOn['title']}"</sh>`);
                  }
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          }
          if (you['movies'].length > 0){
              maxTotalMovies=0;
              for(x in you['movies']){
                  movieNow = you['movies'][x];
                  maxTotalMovies += movieNow['moneyMade'];
              }
              $("#yourInfoAndSuch").append(`
                      <h2>Your Filmography</h2>
                      <p>Total Money from Your films $${comify(maxTotalMovies)}</p>
                  `)
              for(x in you['movies']){
                  let mainMovie = you['movies'][x];
                  $("#yourInfoAndSuch").append(`
                      <div class='bookInf'>
                          <h3>${mainMovie['title']}</h3>
                          <p>Position: <span style='color:red;font-weight:bolder'>${mainMovie['role']}</span></p>
                          <p>Role: <span style='color:red;font-weight:bolder'>${mainMovie['character']}</span></p>
                          <p>Money Earned: <span style='color:green;font-weight:bolder'>$${comify(mainMovie['moneyMade'])}</span></p>
                      </div>
                  `)
              }
          }
          if (pastLives.lives.length > 0){
            $("#yourInfoAndSuch").append(`
                      <h2>Your Past Lives</h2>
                  `)
              for(x in pastLives.lives){
                  let liveRn = pastLives['lives'][x];
                  $("#yourInfoAndSuch").append(`
                    <div id='${x}' class='clicker teacher'>
                    <h3 style='margin:0;padding:0'>${liveRn['full_name']}</h3>
                    <small class='clicker' style='color:red;font-weight:bolder;margin:0;padding:0'>${liveRn['trophy']}</small>
                    <br>
                    <small class='clicker' style='color:purple;font-weight:bolder;margin:0;padding:0'>Lovers: ${liveRn['lovers']}</small>
                    <br>
                    <small class='clicker' style='color:red;font-weight:bolder;margin:0;padding:0'>Age: ${liveRn['age']}</small>
                    <br>
                    <small class='clicker' style='color:green;font-weight:bolder;margin:0;padding:0'>$${comify(liveRn['money'])}</small>
                  </div>
                  `)
              }
          }
          $(".clicker").on('click',function(){
            liveOn = pastLives['lives'][Number($(this).attr('id'))]
            liveRn = liveOn;
            $("#yourInfoAndSuch").html(`
                <div class='bookInf'>
                <h3>${liveRn['full_name']}</h3>
                <p>Age: <span style='color:red;font-weight:bolder'>${liveRn['age']}</span></p>
                <p>Trophy: <span style='color:red;font-weight:bolder'>${liveRn['trophy']}</span></p>
                <p>Net Worth: <span style='color:green;font-weight:bolder'>$${comify(liveRn['money'])}</span></p>
                <p>Lovers: <span style='color:green;font-weight:bolder'>${liveRn['lovers']}</span></p>
                <p>Murders: <span style='color:red;font-weight:bolder'>${liveRn['murders']}</span></p>
                <p>Books: <span style='color:red;font-weight:bolder'>${liveRn['books']}</span></p>
                <p>Songs: <span style='color:red;font-weight:bolder'>${liveRn['songs']}</span></p>
                <div>Summary: <span style='color:red;font-weight:bolder'>${liveRn['summary']}</span></div>
                </div>
            `)
            })
      }
  })
  
  $("#financeButton").on('click',function(){
      $("#buttons").hide();
      $("#leave").show();
      $("#finance").show();
      $("#finance").html('');
      $("#events").hide();
      $("#finance").append(`<center><small class='italic'>Click on a finance card to view/buy assets</small></center>`)
      $("#finance").append(`<br><div class='sectionHighlight gray' id='youHouse'><h1>Your Houses</h1></div>`)
      $("#finance").append(`<br><div class='sectionHighlight gray' id='youCar'><h1>Your Cars</h1></div>`)
      $("#finance").append(`<br><div class='sectionHighlight gray' id='youGem'><h1>Your Gems</h1></div>`)
      $("#finance").append(`<br><div class='sectionHighlight gray blueCard' id='housesShow'><h1>Houses</h1></div>`)
      $("#finance").append(`<br><div class='sectionHighlight gray blueCard' id='carShow'><h1>Cars</h1></div>`)
      $("#finance").append(`<br><div class='sectionHighlight gray blueCard' id='gemShow'><h1>Gems</h1></div>`)
  
      $("#gemShow").on('click',function(){
          $("#finance").html('')
          if (gems.length <= 0){
              $("#finance").append('<center><h1>No Gems Currently For Sale</h1></center>')
          }
          else{
              $("#finance").append(`<center><small class='italic'>Gems</small></center>`)
          }
          for(x in gems){
              if (gems[x]['own']==false){
                  $("#finance").append(`
                  <center><div class='house'>
                      <h3>Gem: <span style='color:green;font-weight:bolder;'>${gems[x]['name']}</span></h3>
                      <p>Cost: <span style='color:green;font-weight:bolder;'>$${comify(gems[x]['cost'])}</span></p>
                      <div>
                          Beauty
                          <div class='healthBar'>
                              <div class='healthMiddle' style='width:${gems[x]['hapEff'] * 100/9}px'>
                              </div>
                          </div>
                      </div>
                      <br>
                      <button class='hang schoolbox buyGem' id='${x}'>Buy Gem</button>
                  </div></center>
                  <br>
              `)
              }
          }
          document.getElementById('finance').scrollTop = 0;
          $(".buyGem").on('click',function(){
              let gemOn = gems[Number($(this).attr('id'))];
              if (you['money']>=gemOn['cost']){
                  you['money']-=gemOn['cost'];
                  gemOn['own']=true;
                  gemOn['shined']=false
                  you['happy'] += gemOn['hapEff']
                  you['gems'].push(gemOn);
                  $('#events').append(`<br><sh class='event'>I bought a gem, ${gemOn['name']}!</sh>`);
              }
              else{
                  $('#events').append(`<br><sh class='event'>I could not afford a ${gemOn['name']}!</sh>`);
              }
              leave();
              update();
          })
      })
  
      $("#youGem").on('click',function(){
          $("#finance").html('')
          if (you['gems'].length <= 0){
              $("#finance").append('<center><h1>You have no gems</h1></center>')
          }
          else{
              $("#finance").append(`<center><small class='italic'>Your Gems</small></center>`)
          }
          for(x in you['gems']){
              let itemObj = you['gems'][x];
              $("#finance").append(`
                  <br>
                  <center><div class='item'>
                      <h3>${itemObj['name']}</h3>
                      <p>Value: <span style='color:green;font-weight:bolder;'>$${comify(itemObj['cost'])}</span></p>
                      <div>
                          Beauty
                          <div class='healthBar'>
                              <div class='healthMiddle' style='width:${itemObj['hapEff'] * 100/9}px'>
                              </div>
                          </div>
                      </div>
                      <br>
                      <button class='hang schoolbox sellGem' id='${x}'>Sell Item</button>
                      <br>
                      <button class='hang schoolbox shineGem' id='${x}'>Shine your ${itemObj['name']}</button>
                  </div></center>
              `)
          }
          document.getElementById('finance').scrollTop = 0;
          $(".sellGem").on('click',function(){
              let carThis = you['gems'][Number($(this).attr('id'))];
              $("#events").append(`<br><sh class='event'>I sold my gem, ${carThis['name']}</sh>`);
              lessBig('Goodbye My Gem!',`You sold your ${carThis['name']}`,'linear-gradient(#659D32, #488214)')
              you['money']+=Math.floor(carThis['cost']*0.8);
              carThis['own']=false;
              you['gems'].splice(Number($(this).attr('id')),1);
              update();
              var objDiv = document.getElementById("events");
              objDiv.scrollTop = objDiv.scrollHeight;
          })
          $(".shineGem").on('click',function(){
              let carThis = you['gems'][Number($(this).attr('id'))];
              $("#events").append(`<br><sh class='event'>I shined my gem, ${carThis['name']}</sh>`);
              if (carThis['shined'] == false){
                  carThis['cost']+=Math.floor(carThis['cost']*0.05);
                  carThis['shined']=true;
              }
              leave()
              update();
              var objDiv = document.getElementById("events");
              objDiv.scrollTop = objDiv.scrollHeight;
          })
      })
  
      $("#housesShow").on('click',function(){
          $("#finance").html('')
          if (houses.length <= 0){
              $("#finance").append('<center><h1>No Houses Currently For Sale</h1></center>')
          }
          else{
              $("#finance").append(`<center><small class='italic'>Houses</small></center>`)
          }
          for(x in houses){
              if (houses[x]['own']==false){
                  $("#finance").append(`
                  <center><div class='house'>
                      <h3>House: <span style='color:green;font-weight:bolder;'>${houses[x]['name']}</span></h3>
                      <p>Cost: <span style='color:green;font-weight:bolder;'>$${comify(houses[x]['cost'])}</span></p>
                      <p>Yearly: <span style='color:green;font-weight:bolder;'>$${comify(houses[x]['yearly'])}</span></p>
                      <button class='hang schoolbox buy' id='${x}'>Buy House</button>
                      <br>
                      <button class='hang schoolbox payOverTime' id='${x}'>Pay over time</button>
                  </div></center>
                  <br>
              `)
              }
          }
          document.getElementById('finance').scrollTop = 0;
      
          $(".buy").on('click',function(){
              let houseOn = houses[Number($(this).attr('id'))];
              if (you['money']>=houseOn['cost']){
                  you['money']-=houseOn['cost'];
                  houseOn['own']=true;
                  houseOn['fixedUp']=false;
                  you['items'].push(houseOn);
                  houses.splice(Number($(this).attr('id')), 1)
                  $('#events').append(`<br><sh class='event'>I bought a house, ${houseOn['name']}!</sh>`);
              }
              else{
                  $('#events').append(`<br><sh class='event'>I cannot afford that house!</sh>`);
              }
              leave();
              update();
              var objDiv = document.getElementById("events");
              objDiv.scrollTop = objDiv.scrollHeight;
          })
          $(".payOverTime").on('click',function(){
              let currentHouse = houses[Number($(this).attr('id'))];
              if (you['salary'] > (currentHouse['cost']/10) || you['money'] > (currentHouse['cost']/2)){
                  $("#events").append(`<br><sh class='event'>I am now paying off a house throughout the course of ten years.</sh>`);
                  currentHouse['years']=10;
                  currentHouse['fixedUp']=false;
                  you['payingOff'].push(currentHouse);
                  houses.splice(Number($(this).attr('id')), 1)
                  leave();
              }
              else{
                  $("#events").append(`<br><sh class='event'>I couldn't afford to buy a certain house in the course of 10 years with my current salary.</sh>`);
                  leave()
              }
              update();
          })
      })
  
      $("#carShow").on('click',function(){
          $("#finance").html('')
          if (cars.length <= 0){
              $("#finance").append('<center><h1>No Cars Currently For Sale</h1></center>')
          }
          else{
              $("#finance").append(`<center><small class='italic'>Cars</small></center>`)
          }
          for(x in cars){
              if (cars[x]['own']==false){
                  $("#finance").append(`
                  <center><div class='house blueCar'>
                      <h3>Car: <span style='color:green;font-weight:bolder;'>${cars[x]['name']}</span></h3>
                      <p>Cost: <span style='color:green;font-weight:bolder;'>$${comify(cars[x]['cost'])}</span></p>
                      <p>Gas Cost Yearly: <span style='color:green;font-weight:bolder;'>$${comify(3000)}</span></p>
                      <button class='hang schoolbox buyCar' id='${x}'>Buy Car</button>
                  </div></center>
                  <br>
              `)
              }
          }
          document.getElementById('finance').scrollTop = 0;
          $(".buyCar").on('click',function(){
              if (you['driversLicense'] == true){
                  let carOn = cars[Number($(this).attr('id'))];
                  if (you['money']>=carOn['cost']){
                      you['money']-=carOn['cost'];
                      carOn['own']=true;
                      carOn['fixedUp']=false;
                      you['cars'].push(carOn);
                      you['happy'] += carOn['hapEff'];
                      cars.splice(Number($(this).attr('id')), 1)
                      $('#events').append(`<br><sh class='event'>I bought a car, ${carOn['name']}!</sh>`);
                  }
                  else{
                      $('#events').append(`<br><sh class='event'>I cannot afford that car!</sh>`);
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I was gonna buy a car but I need a drivers license!</sh>`);
              }
              leave();
              update();
              var objDiv = document.getElementById("events");
              objDiv.scrollTop = objDiv.scrollHeight;
          })
      })
  
      $("#youCar").on('click',function(){
          $("#finance").html('')
          if (you['cars'].length <= 0){
              $("#finance").append('<center><h1>You have no cars</h1></center>')
          }
          else{
              $("#finance").append(`<center><small class='italic'>Your Cars</small></center>`)
          }
          for(x in you['cars']){
              let itemObj = you['cars'][x];
              $("#finance").append(`
                  <br>
                  <center><div class='item'>
                      <h3>${itemObj['name']}</h3>
                      <p>Value: <span style='color:green;font-weight:bolder;'>$${comify(itemObj['cost'])}</span></p>
                      <button class='hang schoolbox sellCar' id='${x}'>Sell Item</button>
                  </div></center>
              `)
          }
          $(".sellCar").on('click',function(){
              let carThis = you['cars'][Number($(this).attr('id'))];
              $("#events").append(`<br><sh class='event'>I sold my car, ${carThis['name']}</sh>`);
              lessBig('Goodbye My Car!',`You sold your car`,'linear-gradient(#659D32, #488214)')
              you['money']+=Math.floor(carThis['cost']*0.8);
              carThis['own']=false;
              carThis['fixedUp']=false;
              you['cars'].splice(Number($(this).attr('id')),1);
              update();
              var objDiv = document.getElementById("events");
              objDiv.scrollTop = objDiv.scrollHeight;
          })
      })
  
      $("#youHouse").on('click',function(){
          $("#finance").html('');
          if (you['items'].length <= 0){
              $("#finance").append('<center><h1>You have no houses</h1></center>')
          }
          else{
              $("#finance").append(`<center><small class='italic'>Your Houses</small></center>`)
          }
          for(x in you['items']){
              let itemObj = you['items'][x];
              $("#finance").append(`
                  <br>
                  <center><div class='item'>
                      <h3>${itemObj['name']}</h3>
                      <p>Value: <span style='color:green;font-weight:bolder;'>$${comify(itemObj['cost'])}</span></p>
                      <button class='hang schoolbox sell' id='${x}'>Sell Item</button>
                      <br>
                      <button class='hang schoolbox fixUp' id='${x}'>Fix Up Item</button>
                      <br>
                      <button class='hang schoolbox partyHouse' id='${x}'>Throw a Party</button>
                  </div></center>
              `)
          }
          document.getElementById('finance').scrollTop = 0;
          $(".sell").on('click',function(){
              let houseThis = you['items'][Number($(this).attr('id'))];
              $("#events").append(`<br><sh class='event'>I sold my house, ${houseThis['name']}</sh>`);
              lessBig('Goodbye My House!',`You sold your house`,'linear-gradient(#659D32, #488214)')
              you['money']+=Math.floor(houseThis['cost']*0.8);
              houseThis['own']=false;
              houseThis['fixedUp']=false;
              you['items'].splice(Number($(this).attr('id')),1);
              update();
              var objDiv = document.getElementById("events");
              objDiv.scrollTop = objDiv.scrollHeight;
          })

          $(".partyHouse").on('click',function(){
            let houseThis = you['items'][Number($(this).attr('id'))];
            $("#events").append(`<br><sh class='event'>I arranged a party at my <span style='color: green'>$${comify(houseThis['cost'])}</span> dollar ${houseThis['name']}.</sh>`);
            if (you['relationships'].length > 0){
                let ppl = [];
                for(x in you['relationships']){
                    newP = you['relationships'][x];
                    if (randrange(2)==1){
                        ppl.push(newP);
                    }
                }
                sentRn = ''
                for(x in ppl){
                    sentRn += `My ${ppl[x]['status']}, ${ppl[x]['full_name']}, came to the party. `
                }
                $("#events").append(`<br><sh class='event'>${sentRn}</sh>`);
                you['stoned']+=randrange(3);
                you['happy']+=randrange(3);
                for(x in ppl){
                    ppl[x]['relation']+=randrange(5);
                    if (ppl[x]['relation']>100){ppl[x]['relation']=100}
                }
            }
            else{
                $("#events").append(`<br><sh class='event'>Sadly I had to cancel plans because I did not know anyone to invite.</sh>`);
            }
            leave();
            update();
            var objDiv = document.getElementById("events");
            objDiv.scrollTop = objDiv.scrollHeight;
        })
      
          $(".fixUp").on('click',function(){
              let houseThis = you['items'][Number($(this).attr('id'))];
              $("#events").append(`<br><sh class='event'>I fixed up my house, ${houseThis['name']}</sh>`);
              if (houseThis['fixedUp'] == false){
                  houseThis['cost']+=Math.floor(houseThis['cost']*0.1)
                  houseThis['fixedUp']=true
              }
              you['happy']-=randrange(3)
              leave();
              update();
              var objDiv = document.getElementById("events");
              objDiv.scrollTop = objDiv.scrollHeight;
          })
      })
  })
  
  $("#careerButton").on('click',function(){
      $("#buttons").hide();
      $("#leave").show();
      $("#careers").show();
      $("#careers").html('');
      $('#events').hide();
      if (you['career']=='none'){
          if (you['age']>=18){
              // Only show colleges if player hasn't been to college yet or wants to go again
              if (you['collegePoints'] == 0) {
                  $("#careers").append(`<center><h3>Colleges</h3></center>`)
                  for(x in colleges){
                      $("#careers").append(`
                          <center>
                              <button class='hang college' id='${x}'>${colleges[x]['title']}<br><small>Cost Yearly: ${comify(colleges[x]['yearly'])}</small></button>
                          </center>
                      `)
                  }
              }
              $("#careers").append(`<center><h3>Careers</h3></center>`)
              for(x in careers){
                  $("#careers").append(`
                      <center><button class='hang career' id='${x}'>${careers[x]['title']}<br><small>Pay: ${comify(careers[x]['salary'])}</small></button></center>
                  `)
              }
          }
          else{
                  $("#careers").append(`
                  <center id='schoolAndStuff'>
                  </center>
              `)
              if (you['age']<=5){
                  $("#schoolAndStuff").append(`<h1>You are too young for a job</h1>`)
              }
              let schooling;
              if (you['age']>5 && you['age'] < 12){
                  schooling = 'elementary school'
              }
              else if (you['age']>=12 && you['age']<14){
                  schooling = 'middle school'
              }
              else if (you['age']>=14){
                  schooling = 'high school'
              }
              if (you['age'] > 5){
                  let popos = []
                  for(x in you['school']['classmates']){
                      popos.push(you['school']['classmates'][x]['relation'])
                  }
                  var total = 0;
                  for(var i = 0; i < popos.length; i++) {
                      total += popos[i];
                  }
                  var avg = total / popos.length;
                  console.log(avg);
                  you['school']['popularity']=Math.floor(avg);
                  $("#schoolAndStuff").append(`
                  <center>
                  <h2 class='school'>School: ${you['school']['name']}</h2>
                  <div>
                      Your Popularity
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width: ${you['school']['popularity']}px'>
                          </div>
                      </div>
                  </div>
                  <br>
                  <div>
                      Your Grades
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width: ${you['school']['grade']}px'>
                          </div>
                      </div>
                  </div>
                  <br>
                  <button class='hang schoolbox' id='tryHard'>Try Harder</button>
                  <br>
                  <button class='hang schoolbox' id='homework'>Do Homework</button>
                  <br>
                  <h2>Your Teachers</h2>
                  <div id='yourTeachers'></div>
                  <h2></h2>
                  <h2>Your Classmates</h2>
                  <div id='yourClassmates'></div>
                  </center>
                  <h2>Cliques</h2>
                  <div id='schoolCliques'></div>
                  </center>
                  `)
  
                  for(x in cliques){
                      cliqueNow = cliques[x];
                      if (cliqueNow['members'].length > 0){
                          $("#schoolCliques").append(`
                          <div class='clique' id='${x}'>
                              <h4 class='teachName'>${cliqueNow['name']}</h4>
                              <small>Members: <span style='font-weight:bolder;color:red'>${cliqueNow['members'].length}</span></small>
                              <div>
                              Popularity
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width:${cliqueNow['popularityReq']}px'>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `)
                      }
                  }
  
                  $(".clique").on('click',function(){
                      whichClique = cliques[Number($(this).attr('id'))];
                      $("#careers").html('');
                      $("#careers").append(`
                          <center>
                              <h2>${whichClique['name']}</h2>
                              <p>Members: <span style='font-weight:bolder;color:red;'>${whichClique['members'].length}</span></p>
                              <br><br>
                              <div>
                              Popularity
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width:${whichClique['popularityReq']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br><br>
                              <h3>Current Members</h3>
                              <div id='membersNow'>
  
                              </div>
                              <br><br>
                              <div id='options'>
                              <button class='hang schoolbox' id='joinClique'>Join Clique</button>
                              </div>
                          </center>
                      `)
                      for(x in whichClique['members']){
                          currentMember = whichClique['members'][x];
                          $("#membersNow").append(`
                              <h4 class='teachName'>${currentMember['full_name']}</h4>
                          `)
                      }
  
                      if (whichClique['name'] == you['school']['clique']){
                          $("#options").append(`
                          <br><br>
                          <button class='hang schoolbox' id='leaveClique'>Leave ${you['school']['clique']} Clique</button>
                      `)
                      }
  
                      $("#leaveClique").on('click',function(){
                          $("#events").append(`<br><sh class='event'>I left the ${you['school']['clique']} clique!</sh>`)
                          you['school']['clique']='none';
                          whichClique['members'].splice(you['school']['position'], 1);
                          leave();
                          update();
                      })
  
                      $("#joinClique").on('click',function(){
                          if (you['school']['clique']=='none'){
                              if (you['school']['popularity'] > randrange(10)+whichClique['popularityReq']){
                                  $("#events").append(`<br><sh class='event'>I joined the ${whichClique['name']} clique!</sh>`)
                                  whichClique['members'].push(you);
                                  you['school']['clique']=whichClique['name'];
                                  you['school']['position']=whichClique.length;
                                  lessBig('Clique!',`I joined the ${whichClique['name']} clique at my school!`,'linear-gradient(#0097FF, #8C34F6)')
                              }else{
                                  $("#events").append(`<br><sh class='event'>The ${whichClique['name']} members said I was too ${choice(meanWords)} to join their clique!</sh>`)
                                  leave();
                              }
                          }
                          else{
                              $("#events").append(`<br><sh class='event'>I am already in a clique!</sh>`)
                              leave()
                          }
                          update();
                      })
                  })
  
                  for(x in you['school']['classmates']){
                      kidNow = you['school']['classmates'][x];
                      $("#yourClassmates").append(`
                          <div class='student' id='${x}'>
                              <h4 class='teachName'>${kidNow['full_name']}</h4>
                              <small>${kidNow['status']}</small>
                              <div>
                                  Relation
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${kidNow['relation']}px'>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `)
                  }
  
                  $(".student").on('click',function(){
                      $("#careers").html('');
                      let kidRn = you['school']['classmates'][Number($(this).attr('id'))];
                      $("#careers").append(`
                          <center>
                              <h4 class='teachName'>${kidRn['full_name']}</h4>
                              <small>${kidRn['status']}</small>
                              <br>
                              <small >Gender: <span style='color:red'>${kidRn['gender']}</span></small>
                              <br>
                              <small>Age: <span style='color:red;font-weight:bolder;'>${kidRn['age']}</span></small>
                              <br>
                              <small>Clique: <span style='font-weight: bolder; color: red;'>${kidRn['clique']}</span></small>
                              <br><br>
                              <div>
                                  Relation
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${kidRn['relation']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <div>
                                  Looks
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${kidRn['looks']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <div>
                                  Smarts
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${kidRn['smarts']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <div>
                                  Popularity
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${kidRn['popularity']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <div id='buttonsForFriend'>
                              <button class='hang schoolbox' id='hangOutWithThem'>Hang Out With Them</button>
                              <br>
                              <button class='hang schoolbox' id='complimentThem'>Compliment Them</button>
                              <br>
                              <button class='hang schoolbox' id='helpSchool'>Help them with school</button>
                              <br>
                              <button class='hang schoolbox' id='copyTheirWork'>Copy off of Them</button>
                              <br>
                              <button class='hang schoolbox' id='fightClassmate'>Fight Them</button>
                              <br>
                              <button class='hang schoolbox' id='spreadRumor'>Spread a rumor about them</button>
                              <br>
                              <button class='hang schoolbox' id='bullyClassmate'>Bully Them</button>
                              </div>
                          </center>
                      `)
  
                      if (kidRn['status']!='friend'){
                          $('#buttonsForFriend').append(`
                              <br>
                              <button class='hang schoolbox' id='friendThem'>Befriend Them</button>
                          `)
                      }
  
                      if (kidRn['gender']!=you['gender']){
                          $('#buttonsForFriend').append(`
                              <br>
                              <button class='hang schoolbox' id='kissThem'>Kiss them</button>
                          `)
                      }

                      $("#bullyClassmate").on('click',function(){
                        who = kidRn;
                        $("#events").append(`<br><sh class='event'>I bullied my ${who['status']}, ${who['full_name']}.</sh>`)
                        who['relation']-=randrange(20);
                        for(let x = 0; x<=randrange(3); x++){
                            $("#events").append(`<br><sh class='event'>I ${choice(attacks)} their ${choice(bodyParts)}!</sh>`)
                        }
                        $("#events").append(`<br><sh class='event'>I then proceeded to call them ${choice(meanWords)}!</sh>`)
                        if (who['popularity'] > you['school']['popularity']){
                            for(i in you['school']['classmates']){
                                per = you['school']['classmates'][i]
                                if (per['popularity'] >= 50){
                                    per['relation']-=randrange(10);
                                    if (per['relation'] < 0){per['relation']=0}
                                }
                            }
                        }
                        else{
                            for(i in you['school']['classmates']){
                                per = you['school']['classmates'][i]
                                if (per['popularity'] >= 50 && per != who){
                                    per['relation']+=randrange(10);
                                    if (per['relation'] > 100){per['relation']=100}
                                }
                            }
                        }
                        notNo = true;
                        for(x in you['relationships']){
                            personOn = you['relationships'][x];
                            if (personOn == who){
                                notNo = false;
                            }
                        }
                        if (who['relation']<0){who['relation']=0}
                        if (notNo == true){
                            who['status']='enemy';
                            if (who['relation'] > 15){
                                who['relation']=15
                            }
                            you['relationships'].push(who);
                        }
                        leave();
                        update();
                        var objDiv = document.getElementById("events");
                        objDiv.scrollTop = objDiv.scrollHeight;
                    })
  
                      $("#kissThem").on('click',function(){
                          $('#events').append(`<br><sh class='event'>I attempted to kiss my ${kidRn['status']}, ${kidRn['full_name']}.</sh>`);
                          if (Math.floor(randrange(10-(kidRn['relation']/10)))==1){
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} accepted the kiss!</sh>`);
                              kidRn['relation']+=randrange(20);
                              single=true;
                              rell='none'
                              for(l in you['relationships']){
                                t = you['relationships'][l];
                                if (t['status']=='girlfriend'||t['status']=='boyfriend'||t['status']=='fiance'||t['status']=='wife'||t['status']=='husband'){
                                  single=false;
                                  rell=t;
                                }
                              }
                              if (single == false && randrange(3)==1){
                                $('#events').append(`<br><sh class='event'>My ${rell['status']}, ${rell['full_name']} found out I kissed my ${kidRn['status']}, ${kidRn['full_name']}!</sh>`);
                                rell['relation']-=randrange(10);
                                if (rell['relation'] < 0){
                                  rell['relation']=0;
                                }
                              }
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} screamed when I tried to kiss them!</sh>`);
                              kidRn['relation']-=randrange(10);
                          }
                          if (kidRn['relation']>100){kidRn['relation']=100}
                          if (kidRn['relation']<0){kidRn['relation']=0}
                          leave();
                          update();
                      })
  
                      $("#spreadRumor").on('click',function(){
                          who = kidRn;
                          $("#events").append(`<br><sh class='event'>I spread a rumor about my ${who['status']}, ${who['full_name']}. I told everyone that they ${choice(rumors)}</sh>`)
                          who['popularity']-=randrange(10);
                          if (who['popularity']<0){who['popularity']=0}
                          who['relation']-=randrange(20);
                          if (randrange(5)==1){
                            $("#events").append(`<br><sh class='event'>They fought me!</sh>`)
                            for(let x = 0; x<=randrange(3); x++){
                              $("#events").append(`<br><sh class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</sh>`)
                              you['health']-=randrange(10)
                            }
                          }
                          notNo = true;
                          for(x in you['relationships']){
                              personOn = you['relationships'][x];
                              if (personOn==who){
                                  notNo = false;
                              }
                          }
                          if (who['relation']<0){who['relation']=0}
                          leave();
                          update();
                          var objDiv = document.getElementById("events");
                          objDiv.scrollTop = objDiv.scrollHeight;
                      })
  
                      $("#fightClassmate").on('click',function(){
                          who = kidRn;
                          $("#events").append(`<br><sh class='event'>I fought my ${who['status']}, ${who['full_name']}.</sh>`)
                          who['relation']-=randrange(20);
                          for(let x = 0; x<=randrange(3); x++){
                              $("#events").append(`<br><sh class='event'>I ${choice(attacks)} their ${choice(bodyParts)}!</sh>`)
                          }
                          for(let x = 0; x<=randrange(3); x++){
                              $("#events").append(`<br><sh class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</sh>`)
                          }
                          if (randrange(3)==1){
                              $("#events").append(`<br><sh class='event'>I won the fight!</sh>`)
                              who['health']-=randrange(10);
                              if (who['health']<0){who['health']=0}; 
                          }else{
                              $("#events").append(`<br><sh class='event'>They won the fight!</sh>`)
                              you['health']-=randrange(10);
                              if (you['health']<0){you['health']=0}; 
                          }
                          you['fights']++;
                          notNo = true;
                          for(x in you['relationships']){
                              personOn = you['relationships'][x];
                              if (personOn['full_name']==who['full_name'] && personOn['age'] == who['age']){
                                  notNo = false;
                              }
                          }
                          if (who['relation']<0){who['relation']=0}
                          if (notNo == true){
                              who['status']='enemy';
                              who['relation']=0;
                              you['relationships'].push(who);
                          }
                          leave();
                          update();
                          var objDiv = document.getElementById("events");
                          objDiv.scrollTop = objDiv.scrollHeight;
                      })
  
                      $("#complimentThem").on('click',function(){
                          $('#events').append(`<br><sh class='event'>I told my ${kidRn['status']}, ${kidRn['full_name']}, that they are ${choice(compliments)}</sh>`);
                          if (kidRn['relation']>randrange(20)){
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} was flattered!</sh>`);
                              kidRn['relation']+=randrange(10);
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} was deeply insulted!</sh>`);
                              kidRn['relation']-=randrange(10);
                          }
                          if (kidRn['relation']>100){kidRn['relation']=100}
                          if (kidRn['relation']<0){kidRn['relation']=0}
                          leave();
                          update();
                      })
  
                      $("#helpSchool").on('click',function(){
                          $('#events').append(`<br><sh class='event'>I helped my ${kidRn['status']}, ${kidRn['full_name']}, with some school work.</sh>`);
                          if (kidRn['relation']>randrange(10)){
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} was very thankfull!</sh>`);
                              kidRn['relation']+=randrange(6);
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} told me that my help was crap!</sh>`);
                              kidRn['relation']-=randrange(3);
                          }
                          if (kidRn['relation']>100){kidRn['relation']=100}
                          if (kidRn['relation']<0){kidRn['relation']=0}
                          leave();
                          update();
                      })
  
                      $("#copyTheirWork").on('click',function(){
                          if (kidRn['relation']>randrange(50)+30){
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} let me cheat off of them!</sh>`);
                              kidRn['relation']+=randrange(10);
                              if (kidRn['smarts'] < 70 && randrange(2)==1){
                                  $('#events').append(`<br><sh class='event'>${kidRn['full_name']}'s answers were garbage!</sh>`);
                                  you['school']['grade']-=randrange(10);
                              }else{
                                  $('#events').append(`<br><sh class='event'>${kidRn['full_name']}'s answers were great!</sh>`);
                                  you['school']['grade']+=randrange(20);
                              }
                          }else{
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} did not let me cheat off of them!</sh>`);
                              kidRn['relation']-=randrange(10);
                          }
                          if (kidRn['relation']<0){kidRn['relation']=0}
                          if (kidRn['relation']>100){kidRn['relation']=100}
                          leave();
                          update();
                      })
  
                      $("#friendThem").on('click',function(){
                          if (kidRn['relation']>randrange(50)+50){
                              $('#events').append(`<br><sh class='event'>I am now friends with ${kidRn['full_name']}!</sh>`);
                              kidRn['status']='friend';
                              you['relationships'].push(kidRn);
                              kidRn['relation']+=randrange(10);
                              you['happy']+=randrange(10);
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} did not want to be friends with me!</sh>`);
                              kidRn['relation']-=randrange(10);
                              you['happy']-=randrange(10);
                          }
                          if (kidRn['relation']>100){kidRn['relation']=100}
                          if (kidRn['relation']<0){kidRn['relation']=0}
                          leave();
                          update();
                      })
  
                      $("#hangOutWithThem").on('click',function(){
                          $('#events').append(`<br><sh class='event'>I asked ${kidRn['full_name']}, from school, if they wanted to hang out!</sh>`);
                          if (kidRn['relation']>randrange(50)+30){
                              $('#events').append(`<br><sh class='event'>They said yes, we hung out! We ${choice(hungOutDo)}</sh>`);
                              kidRn['relation']+=randrange(10);
                              you['happy']+=randrange(10);
                              if (kidRn['relation']>100){kidRn['relation']=100}
                          }else{
                              $('#events').append(`<br><sh class='event'>They said I was too ${choice(meanWords)} to hang out with.</sh>`);
                              kidRn['relation']-=randrange(20)
                              you['happy']-=randrange(4);
                              if (kidRn['relation']<0){kidRn['relation']=0}
                          }
                          leave();
                          update();
                      })
                  })
  
                  for(x in you['school']['teachers']){
                      teacherNow = you['school']['teachers'][x];
                      $("#yourTeachers").append(`
                          <div class='teacher' id='${x}'>
                              <h4 class='teachName'>${teacherNow['full_name']}</h4>
                              <small>${teacherNow['status']}</small>
                              <div>
                                  Relation
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${teacherNow['relation']}px'>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `)
                  }
  
                  $(".teacher").on('click',function(){
                      $("#careers").html('');
                      let teacherRn = you['school']['teachers'][Number($(this).attr('id'))];
                      $("#careers").append(`
                          <center>
                              <h4 class='teachName'>${teacherRn['full_name']}</h4>
                              <small>${teacherRn['status']}</small>
                              <br><br>
                              <div>
                                  Relation
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${teacherRn['relation']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <button class='hang schoolbox' id='begThem'>Beg them to raise your grade</button>
                          </center>
                      `)
  
                      $("#begThem").on('click',function(){
                          $('#events').append(`<br><sh class='event'>I begged my teacher, ${teacherRn['full_name']}, for a better grade!</sh>`);
                          if (teacherRn['relation']>randrange(10)+90){
                              upgradedAmount = randrange(20);
                              teacherRn['relation']+=randrange(5)
                              $('#events').append(`<br><sh class='event'>They said yes! They moved my grade up ${upgradedAmount} points!</sh>`);
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>They laughed at me for asking!</sh>`);
                              you['school']['grade']--;
                              you['happy']-=randrange(4);
                              teacherRn['relation']-=randrange(5)
                          }
                          if (teacherRn['relation']>100){teacherRn['relation']=100}
                          if (teacherRn['relation']<0){teacherRn['relation']=0}
                          leave();
                          update();
                      })
                  })
  
                  $("#tryHard").on('click',function(){
                      $('#events').append(`<br><sh class='event'>I studied harder at ${you['school']['name']}!</sh>`);
                      you['smarts']+=randrange(4)
                      you['school']['grade']+=randrange(5);
                      leave();
                      update();
                  })
  
                  $("#homework").on('click',function(){
                      $('#events').append(`<br><sh class='event'>I did some homework!</sh>`);
                      you['smarts']+=randrange(3)
                      you['school']['grade']+=randrange(7);
                      leave();
                      update();
                  })
                  
              }
          }
      }
      else{
          $("#careers").append(`
                  <center>
                      <h1>You are a ${you['career']}!</h1>
                      <br>
                      <button class='hang quit' id='jobQuit'>Quit being a ${you['career']}</button>
                      <div id='interActive'>
                      </div>
                  </center>
              `)
              if (you['career']=='college student'){
                  $("#interActive").append(`
                  <h2>Your Professors</h2>
                  <div id='teachers'>
  
                  </div>
                  <h2>Your Co-Students</h2>
                  <div id='classmates'>
  
                  </div>
                  `)
                  for(x in you['school']['teachers']){
                      teacherRn = you['school']['teachers'][x];
                      $("#teachers").append(`
                          <div class='teacher' id='${x}'>
                              <h3 class='teachName'>${teacherRn['full_name']}</h3>
                              <small>${teacherRn['status']}</small>
                              <br>
                              <div>
                              Relation
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width:${teacherRn['relation']}px'>
  
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `)
                  }
  
                  $(".teacher").on('click',function(){
                      $("#careers").html('');
                      let teacherRn = you['school']['teachers'][Number($(this).attr('id'))];
                      $("#careers").append(`
                          <center>
                              <h4 class='teachName'>${teacherRn['full_name']}</h4>
                              <small>${teacherRn['status']}</small>
                              <br><br>
                              <div>
                                  Relation
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${teacherRn['relation']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <button class='hang schoolbox' id='begThem'>Beg them to raise your grade</button>
                          </center>
                      `)
  
                      $("#begThem").on('click',function(){
                          $('#events').append(`<br><sh class='event'>I begged my teacher, ${teacherRn['full_name']}, for a better grade!</sh>`);
                          if (teacherRn['relation']>randrange(10)+90){
                              upgradedAmount = randrange(20);
                              teacherRn['relation']+=randrange(5)
                              $('#events').append(`<br><sh class='event'>They said yes! They moved my grade up ${upgradedAmount} points!</sh>`);
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>They laughed at me for asking!</sh>`);
                              you['school']['grade']--;
                              you['happy']-=randrange(4);
                              teacherRn['relation']-=randrange(5)
                          }
                          if (teacherRn['relation']>100){teacherRn['relation']=100}
                          if (teacherRn['relation']<0){teacherRn['relation']=0}
                          leave();
                          update();
                      })
                  })
                  for(x in you['school']['classmates']){
                      studentRn = you['school']['classmates'][x];
                      $("#classmates").append(`
                          <div class='student' id='${x}'>
                              <h3 class='teachName'>${studentRn['full_name']}</h3>
                              <small>${studentRn['status']}</small>
                              <br>
                              <div>
                              Relation
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width:${studentRn['relation']}px'>
  
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `)
                  }
                  $(".student").on('click',function(){
                      $("#careers").html('');
                      let kidRn = you['school']['classmates'][Number($(this).attr('id'))];
                      $("#careers").append(`
                          <center>
                              <h4 class='teachName'>${kidRn['full_name']}</h4>
                              <small>${kidRn['status']}</small>
                              <br>
                              <small style='color:orange'>Age: ${kidRn['age']}</small>
                              <br><br>
                              <div>
                                  Relation
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${kidRn['relation']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <div>
                                  Looks
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${kidRn['looks']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <div>
                                  Smarts
                                  <div class='healthBar'>
                                      <div class='healthMiddle' style='width: ${kidRn['smarts']}px'>
                                      </div>
                                  </div>
                              </div>
                              <br>
                              <div id='buttonsForFriend'>
                              <button class='hang schoolbox' id='hangOutWithThem'>Hang Out With Them</button>
                              <br>
                              <button class='hang schoolbox' id='copyTheirWork'>Copy off of Them</button>
                              <br>
                              <button class='hang schoolbox' id='complimentThem'>Compliment Them</button>
                              <br>
                              <button class='hang schoolbox' id='fightClassmate'>Fight Them</button>
                              </div>
                          </center>
                      `)
  
                      if (kidRn['status']!='friend'){
                          $('#buttonsForFriend').append(`
                              <br>
                              <button class='hang schoolbox' id='friendThem'>Befriend Them</button>
                          `)
                      }
  
                      $("#fightClassmate").on('click',function(){
                          who = kidRn;
                          $("#events").append(`<br><sh class='event'>I fought my ${who['status']}, ${who['full_name']}.</sh>`)
                          who['relation']-=randrange(20);
                          for(let x = 0; x<=randrange(3); x++){
                              $("#events").append(`<br><sh class='event'>I ${choice(attacks)} their ${choice(bodyParts)}!</sh>`)
                          }
                          for(let x = 0; x<=randrange(3); x++){
                              $("#events").append(`<br><sh class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</sh>`)
                          }
                          if (randrange(3)==1){
                              $("#events").append(`<br><sh class='event'>I won the fight!</sh>`)
                              who['health']-=randrange(10);
                              if (who['health']<0){who['health']=0}; 
                          }else{
                              $("#events").append(`<br><sh class='event'>They won the fight!</sh>`)
                              you['health']-=randrange(10);
                              if (you['health']<0){you['health']=0}; 
                          }
                          you['fights']++;
                          notNo = true;
                          for(x in you['relationships']){
                              personOn = you['relationships'][x];
                              if (personOn['full_name']==who['full_name'] && personOn['age'] == who['age']){
                                  notNo = false;
                              }
                          }
                          if (who['relation']<0){who['relation']=0}
                          if (notNo == true){
                              who['status']='enemy';
                              who['relation']=0;
                              you['relationships'].push(who);
                          }
                          leave();
                          update();
                          var objDiv = document.getElementById("events");
                          objDiv.scrollTop = objDiv.scrollHeight;
                      })
  
                      $("#complimentThem").on('click',function(){
                          $('#events').append(`<br><sh class='event'>I told my ${kidRn['status']}, ${kidRn['full_name']}, that they are ${choice(compliments)}</sh>`);
                          if (kidRn['relation']>randrange(20)){
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} was flattered!</sh>`);
                              kidRn['relation']+=randrange(10);
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} was deeply insulted!</sh>`);
                              kidRn['relation']-=randrange(10);
                          }
                          if (kidRn['relation']>100){kidRn['relation']=100}
                          if (kidRn['relation']<0){kidRn['relation']=0}
                          leave();
                          update();
                      })
  
                      $("#copyTheirWork").on('click',function(){
                          if (kidRn['relation']>randrange(50)+30){
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} let me cheat off of them!</sh>`);
                              kidRn['relation']+=randrange(10);
                              if (kidRn['smarts'] < 70 && randrange(2)==1){
                                  $('#events').append(`<br><sh class='event'>${kidRn['full_name']}'s answers were garbage!</sh>`);
                                  you['school']['grade']-=randrange(10);
                              }else{
                                  $('#events').append(`<br><sh class='event'>${kidRn['full_name']}'s answers were great!</sh>`);
                                  you['school']['grade']+=randrange(20);
                              }
                          }else{
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} did not let me cheat off of them!</sh>`);
                              kidRn['relation']-=randrange(10);
                          }
                          if (kidRn['relation']<0){kidRn['relation']=0}
                          if (kidRn['relation']>100){kidRn['relation']=100}
                          leave();
                          update();
                      })
  
                      $("#friendThem").on('click',function(){
                          if (kidRn['relation']>randrange(50)+50){
                              $('#events').append(`<br><sh class='event'>I am now friends with ${kidRn['full_name']}!</sh>`);
                              kidRn['status']='friend';
                              you['relationships'].push(kidRn);
                              kidRn['relation']+=randrange(10);
                              you['happy']+=randrange(10);
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>${kidRn['full_name']} did not want to be friends with me!</sh>`);
                              kidRn['relation']-=randrange(10);
                              you['happy']-=randrange(10);
                          }
                          if (kidRn['relation']>100){kidRn['relation']=100}
                          if (kidRn['relation']<0){kidRn['relation']=0}
                          leave();
                          update();
                      })
  
                      $("#hangOutWithThem").on('click',function(){
                          $('#events').append(`<br><sh class='event'>I asked ${kidRn['full_name']}, from school, if they wanted to hang out!</sh>`);
                          if (kidRn['relation']>randrange(50)+30){
                              $('#events').append(`<br><sh class='event'>They said yes, we hung out! We ${choice(hungOutDo)}</sh>`);
                              kidRn['relation']+=randrange(10);
                              you['happy']+=randrange(10);
                              if (kidRn['relation']>100){kidRn['relation']=100}
                          }else{
                              $('#events').append(`<br><sh class='event'>They said I was too ${choice(meanWords)} to hang out with.</sh>`);
                              kidRn['relation']-=randrange(20)
                              you['happy']-=randrange(4);
                              if (kidRn['relation']<0){kidRn['relation']=0}
                          }
                          leave();
                          update();
                      })
                  })
              }
          $(".quit").on('click',function(){
              if (you['career']!='college student'){
                  jobQuitting=careers[you['spot']]
                  jobQuitting=careers[you['spot']]
                  you['salary']-=jobQuitting['salary'];
                  $('#events').append(`<br><sh class='event'>I am no longer a ${jobQuitting['title']}!</sh>`);
              }
              else{
                  $('#events').append(`<br><sh class='event'>I am no longer in college!</sh>`);
              }
              you['career']='none';
              leave();
              update();
              var objDiv = document.getElementById("events");
              objDiv.scrollTop = objDiv.scrollHeight;
          })
      }
      $(".college").on('click',function(){
          let collegeNow = colleges[Number($(this).attr('id'))];
          if (you['collegePoints'] == 0){
              if (you['smarts']>collegeNow['smartsReq']){
                  you['career']='college student';
                  you['term']=collegeNow['years'];
                  you['payYear']=collegeNow['yearly'];
                  you['pointsCollege']=collegeNow['points'];
                  lessBig('College!',`You were accepted to college`,'linear-gradient(#f8d568, #FF9900)')
                  $('#events').append(`<br><sh class='event'>I am now going to college.</sh>`);
                  newSchoolPeople(6, 30, 'College');
              }else{
                  $('#events').append(`<br><sh class='event'>I am not smart enough to go to this college.</sh>`);
                  leave();
              }
          }else{
              $('#events').append(`<br><sh class='event'>I have already been to college</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $(".career").on('click',function(){
          let careerNow = careers[Number($(this).attr('id'))];
          if (you['age'] >= 18){
              if (you['career']=='none'){
                  if (you['health'] >= careerNow['healthReq']){
                      if (you['happy']>=careerNow['happyReq']){
                          if (you['looks']>=careerNow['looksReq']){
                              if (you['smarts']>=careerNow['smartsReq']){
                                  if (you['prisonYears'] <= careerNow['prisonYears']){
                                      if (careerNow['schoolReq']==0 || you['collegePoints']==careerNow['schoolReq']){
                                          $('#events').append(`<br><sh class='event'>I am now a ${careerNow['title']}!</sh>`);
                                          lessBig('Job!',`You are now a ${careerNow['title']}`,'linear-gradient(#f8d568, #FF9900)')
                                          you['salary']+=careerNow['salary'];
                                          you['career']=careerNow['title'];
                                          you['jobSal']=careerNow['salary']
                                          you['job']=careerNow
                                          you['spot']=Number($(this).attr('id'));
                                      }
                                      else{
                                          $('#events').append(`<br><sh class='event'>I need to go to college to be a ${careerNow['title']}!</sh>`);
                                          leave();
                                      }
                                  }
                                  else{
                                      $('#events').append(`<br><sh class='event'>I have been to prison to much to be a ${careerNow['title']}!</sh>`);
                                      leave();
                                  }
                              }
                              else{
                                  $('#events').append(`<br><sh class='event'>I am not smart enough to be a ${careerNow['title']}!</sh>`);
                                  leave();
                              }
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>I am too ugly to be a ${careerNow['title']}!</sh>`);
                              leave();
                          }
                      }
                      else{
                          $('#events').append(`<br><sh class='event'>I am not happy enough to be a ${careerNow['title']}!</sh>`);
                          leave();
                      }
                  }
                  else{
                      $('#events').append(`<br><sh class='event'>I am not healthy enough to be a ${careerNow['title']}!</sh>`);
                      leave();
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I already have a job.</sh>`);
                  leave();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am not old enough to be a ${careerNow['title']}!</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  })
  
  $("#activitiesButton").on('click',function(){
      $("#buttons").hide();
      $("#leave").show();
      $("#activities").show();
      $("#activities").html('');
      $("#events").hide();
      $("#activities").append(`
          <center>
          <h2>Love</h2>
          <div id='love'>
  
          </div>
          <h2>For Assets</h2>
          <div id='assets'>
  
          </div>
          <h2>Social</h2>
          <div id='social'>
  
          </div>
          <h2>Fame</h2>
          <div id='fame'>
  
          </div>
          <h2>Health and Mind</h2>
          <div id='healthAndMind'>
          
          </div>
          <h2>No Risk No Reward</h2>
          <div id='riskMoney'>
          
          </div>
          <h2>Crimes</h2>
          <div id='crime'>
  
          </div>
          <h2>For Fun</h2>
          <div id='forFun'>
          
          </div>
          </center>
      `)
      $("#riskMoney").append(`
          <button class='gamble exp' id='lottery'>Play the lottery<br>Cost: $5</button>
          <br><br>
          <button class='gamble exp' id='lottery10'>Buy 10 lottery tickets<br>Cost: $50</button>
          <br>
      `)
      $("#assets").append(`
          <button class='friend' id='driverLicense'>Get a Drivers License</button>
          <br>
      `)
      $("#social").append(`
          <button class='friend' id='friend'>Make a friend</button>
          <br>
      `)
      $("#forFun").append(`
          <button class='hang schoolbox' id='videogame'>Play A Video Game</button>
          <br>
      `)
      $("#love").append(`
          <button class='date' id='date'>Meet someone to Date</button>
          <br><br>
          <button class='date' id='hookup'>Random Hookup</button>
      `)
      $("#fame").append(`
          <button class='fame' id='book'>Write A Book<br><small>Cost: <span style='color:green;'>2,000$</span></small></button><br><br>
          <button class='fame' id='actingGig'>Find an Acting Gig<br><br></button><br><br>
          <button class='fame' id='song'>Record A Song<br><small>Studio Session: <span style='color:green;'>500$</span></small></button>
      `)
      $("#crime").append(`
          <button class='crime' id='jayWalk'>Jay Walk</button>
          <br><br>
          <button class='crime' id='robber'>Rob Someone</button>
          <br><br>
          <button class='crime' id='assault'>Assault Someone</button>
          <br><br>
          <button class='crime' id='murder'>Murder Someone</button>
          <br><br>
          <button class='crime' id='arson'>Commit Arson</button>
          <br><br>
          <button class='crime' id='mailBall'>Play Mailbox Baseball</button>
          <br><br>
          <button class='crime' id='porchPirate'>Commit Porch Pirate</button>
          <br><br>
          <div class='drugs'>
          <h2>Drugs</h2>
          <button class='drug exp' id='cigar'>Smoke a Pack of Cigarrettes<br>Cost: $7</button>
          <br><br>
          <button class='drug exp' id='vape'>Vape<br>Cost: $10</button>
          <br><br>
          <button class='drug exp' id='smokePot'>Smoke Pot<br>Cost: $20</button>
          <br><br>
          <button class='drug exp' id='smokeMeth'>Smoke Meth<br>Cost: $50</button>
          <br><br>
          <button class='drug exp' id='snortCoke'>Snort Cocaine<br>Cost: $100</button>
          <br><br>
          <button class='drug exp' id='shootHeroin'>Shoot Heroin<br>Cost: $100</button>
          <br><br>
          <button class='drug exp' id='lsd'>Take LSD<br>Cost: $200</button>
          <br><br>
          <button class='drug exp' id='pcp'>Take PCP<br>Cost: $200</button>
          </div>
      `)
      for(x in activities){
          $("#healthAndMind").append(`
          <button id='${x}' class='activity exp'>${activities[x]['title']}<br><small style='color:green'>Cost: $${comify(activities[x]['moneyReq'])}</small></button>
          <br><br>
          `)
      }
      $("#healthAndMind").append(`
          <button id='goToDoctor' class='activity exp'>Go to the Doctor<br><small style='color:green'>Cost: $200</small></button>
          <br><br>
      `)

      $("#videogame").on('click',function(){
          if (you['age'] < 3){
            $("#activities").html('<h1>You are too young to play video games</h1>')
          }
          else{
              $("#activities").html(`
                <center><small class='italic'>Video Games</small>
                <br>
                <button id='fortnite' class='hang schoolbox'>Play Fortnite</button>
                <br>
                <button id='gta5' class='hang schoolbox'>Play GTA5</button></center>
              `)
          }

          $("#fortnite").on('click',function(){
                $('#events').append(`<br><sh class='event'>I played Fortnite</sh>`);
                you['happy']+=randrange(5);
                you['smarts']-=randrange(3);
                leave()
                update();
          })
          $("#gta5").on('click',function(){
            $('#events').append(`<br><sh class='event'>I played GTA5</sh>`);
            you['happy']+=randrange(5);
            you['smarts']-=randrange(5);
            leave()
            update();
      })
      })
  
      $("#driverLicense").on('click',function(){
          if (you['age'] >= 16){
              if (you['driversLicense'] == false){
                  gav=randrange(10) - Math.floor(you['smarts']/10)
                  if (gav < 1){
                      gav=1
                  }
                  if (gav == 1){
                      $('#events').append(`<br><sh class='event'>I got my drivers license!!</sh>`);
                      you['driversLicense']=true;
                      lessBig('License!!',`You have a drivers license!`,'linear-gradient(orange, pink)')
                  }
                  else{
                      $('#events').append(`<br><sh class='event'>I failed my drivers test</sh>`);
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I already have a drivers license!!</sh>`);
                  leave()
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to get a drivers license</sh>`);
              leave()
          }
          update()
          
      })
  
      $("#lottery10").on('click',function(){
          if (you['money'] >= 50){
              you['money']-=50;
              $('#events').append(`<br><sh class='event'>I bought ten lottery tickets <span style='color:red;'>-$50</span>!</sh>`);
              if (randrange(105)==1){
                  $('#events').append(`<br><sh class='event'>I won the lottery!!</sh>`);
                  wonAmount = randrange(11000000);
                  $('#events').append(`<br><sh class='event'>I won <span style='color:green;'>$${comify(wonAmount)}</span> dollars!</sh>`);
                  you['money']+=wonAmount;
                  lessBig('Money!!',`You won the lottery!`,'linear-gradient(orange, pink)')
              }
              else{
                  $('#events').append(`<br><sh class='event'>I did not win the lottery</sh>`);
                  leave();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I can't afford ten lottery tickets</sh>`);
              leave();
          }
          update();
      })
  
      $("#actingGig").on('click',function(){
          if (you['age'] > 10){
              looksTen = 10 - Math.floor(you['looks']/10) - Math.floor(you['fame']/100 - Math.floor(you['comedy']/20));
              if (looksTen < 2){
                  looksTen = 2
              }
              if (randrange(looksTen)==1){
                  expec = randrange(1000 - (you['fame']/20))
                  if (expec < 2){
                      expec = 2
                  }
                  if (randrange(expec)==1){
                      position = 'lead'
                      multiply = 1
                      if (you['fame'] > 10){
                          multiply = 1.3
                      }
                      if (you['fame'] > 50){
                          multiply = 1.5
                      }
                      if (you['fame'] > 50){
                          multiply = 2
                      }
                      money = randrange(10000) + Math.floor(you['fame']*0.5) * multiply;
                      multAmount = 0.05;
                      if (money > 5000000){
                          money = randrange(6000000);
                      }
                  }
                  else{
                      position = 'small role'
                      money = randrange(300);
                      multAmount = 0.05;
                  }
                  you['fame'] += randrange(Math.floor(money * multAmount));
                  you['money'] += money
                  if (you['gender'] == 'Male'){
                      charName = choice(mNames) + ' ' + choice(lNames)
                   }
                   else{
                      charName = choice(fNames) + ' ' + choice(lNames)
                   }
                   movName = choice(movTitle1) + ' ' + choice(movTitle2);
                   let movieObj = 
                   {
                      title: movName,
                      character: charName,
                      role: position,
                      moneyMade: money
                   }
                   you['movies'].push(movieObj)
                  $('#events').append(`<br><sh class='event'>I was a ${position} playing ${charName} in a movie called "${movName}"!</sh>`);
                  $('#events').append(`<br><sh class='event'>I made <span style='color:green'>$${comify(money)}</span>!</sh>`);
              }
              else{
                  $('#events').append(`<br><sh class='event'>I could not get an acting gig!</sh>`);
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to get an acting gig!</sh>`);
          }
          leave();
          update();
      })
  
      $("#lottery").on('click',function(){
          if (you['money'] >= 5){
              you['money']-=5;
              $('#events').append(`<br><sh class='event'>I bought a lottery ticket <span style='color:red;'>-$5</span>!</sh>`);
              if (randrange(450)==1){
                  $('#events').append(`<br><sh class='event'>I won the lottery!!</sh>`);
                  wonAmount = randrange(11000000);
                  $('#events').append(`<br><sh class='event'>I won <span style='color:green;'>$${comify(wonAmount)}</span> dollars!</sh>`);
                  you['money']+=wonAmount;
                  lessBig('Money!!',`You won the lottery!`,'linear-gradient(orange, pink)')
              }
              else{
                  $('#events').append(`<br><sh class='event'>I did not win the lottery</sh>`);
                  leave();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I can't afford a lottery ticket</sh>`);
              leave();
          }
          update();
      })
  
      $("#hookup").on('click',function(){
          if (you['age']>=18){
              if (you['gender']=='Male'){
                  theirName = choice(fNames);
                  theirGender = 'Female';
              }
              else {
                  theirName = choice(lNames);
                  theirGender = 'Male';
              }
              theirAge = randrange(you['age'])+10
              if (theirAge < 18){
                  theirAge = 18;
              }
              theirLastName = choice(lNames);
              let flingObj = {
                  "full_name":theirName + ' ' + theirLastName,
                  "last_name":theirLastName,
                  "first_name":theirName,
                  "blood":false,
                  "relation":randrange(50)+20,
                  "status":'ex-fling',
                  "age":theirAge,
                  "money":randrange(6000),
                  "happy":randrange(100),
                  "looks":randrange(100),
                  "health":randrange(100),
                  "smarts":randrange(100),
                  "gender":theirGender
              }
              you['relationships'].push(flingObj);
              lovers++;
              $('#events').append(`<br><sh class='event'>I hooked up with a ${flingObj['age']} year old named ${flingObj['full_name']}</sh>`);
              you['happy']+=randrange(10);
              if (randrange(3)==1){
                  for(x in you['relationships']){
                      let curr = you['relationships'][x];
                      if (curr['status']=='boyfriend'||curr['status']=='girlfriend'||curr['status']=='fiance'||curr['status']=='wife'||curr['status']=='husband'){
                          curr['relation']-=randrange(50);
                          $('#events').append(`<br><sh class='event'>My ${curr['status']}, ${curr['full_name']}, found out I cheated on them!</sh>`);
                          you['happy']-=randrange(10);
                      }
                  }
              }
              if (randrange(5)==1){
                  std = choice(stds)
                  you['diseases'].push(std);
                  $('#events').append(`<br><sh class='event'>I contracted ${std['name']}</sh>`);
                  you['happy']-=randrange(10);
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to hookup with someone</sh>`);
          }
          if (you['happy']>100){you['happy']=100};
          leave();
          update();
      })
  
      $("#song").on('click',function(){
          if (you['age']>5){
              if (you['money']>500){
                  you['money']-=500;
                  let song = prompt('Song Title','Epic Song')
                  $('#events').append(`<br><sh class='event'>I recorded a song titled "${song}"</sh>`);
                  you['fame']+=randrange(3);
                  let succession = randrange(you['fame']+you['smarts']+you['comedy']);
                  if (randrange(150)==1){
                      $('#events').append(`<br><sh class='event'>My song "${song}" was a hit!</sh>`);
                      you['fame']+=randrange(200 + you['comedy']);
                      succession = randrange(you['fame']+you['smarts']+you['comedy']);
                      succession*=randrange(30);
                  }
                  let songObj = 
                  {
                      title: song,
                      maxMoney: succession,
                      writer: you['full_name'],
                      totalEarned: 0,
                      totalSpent: 500,
                      advertiseYear: false
                  }
                  you['songs'].push(songObj);
              }
              else{
                  $('#events').append(`<br><sh class='event'>I need more money to fund my studio session song.</sh>`);
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to record a song.</sh>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#book").on('click',function(){
          if (you['age']>15){
              if (bookYear==false){
                  if (you['money']>2000){
                      you['money']-=2000;
                      let book = prompt('Book Title','My Life')
                      $('#events').append(`<br><sh class='event'>I wrote a book titled "${book}"</sh>`);
                      you['fame']+=randrange(5);
                      let succession = randrange(you['fame']+you['smarts']+you['comedy']);
                      if (randrange(100)==1){
                          $('#events').append(`<br><sh class='event'>My book "${book}" was a hit!</sh>`);
                          you['fame']+=randrange(200 + you['comedy']);
                          succession = randrange(you['fame']+you['smarts']);
                          succession*=randrange(100);
                      }
                      let bookObj = 
                      {
                          title: book,
                          maxMoney: succession,
                          author: you['full_name'],
                          totalEarned: 0,
                          totalSpent: 2000,
                          advertiseYear: false
                      }
                      you['books'].push(bookObj);
                      bookYear=true;
                  }
                  else{
                      $('#events').append(`<br><sh class='event'>I need more money to fund my book.</sh>`);
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I already wrote a book this year.</sh>`);
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to write a book.</sh>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#smokePot").on('click',function(){
          if (you['age']>=18){
            if (you['money'] >= 20){
              $('#events').append(`<br><sh class='event'>I smoked pot!</sh>`);
              you['happy']+=randrange(6)
              you['smarts']-=randrange(3)
              am = randrange(6)
              you['stoned']+=am
              totalStoned += am;
              if (you['health']<0){you['health']=0}
              if (you['happy']>100){you['happy']=100}
              if (you['smarts']<0){you['smarts']=0}
              if (randrange(20)==1){
                  $('#events').append(`<br><sh class='event'>I was caught!</sh>`);
                  sentence = randrange(3);
                  prisShuf();
                  $('#events').append(`<br><sh class='event'>I am going to prison for ${sentence} year/s!</sh>`);
                  you['inPrison']=true;
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  you['career']='none';
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leave").hide();
              }
              else{
                  leave()
              }
            }
            else{
              $('#events').append(`<br><sh class='event'>I don't have enough money to buy weed!</sh>`);
              leave();
            }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to do drugs!</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#vape").on('click',function(){
          if (you['age']>=13){
            if (you['money'] >= 10){
                $('#events').append(`<br><sh class='event'>I vaped, it costed $10!</sh>`);
                alreadyOn=false;
                wasOn = false;
                you['money']-=10;
                you['happy']+=randrange(3)
                you['smarts']-=randrange(2)
                am = randrange(2)
                you['stoned']+=am
                totalStoned += am;
                if (you['health']<0){you['health']=0}
                if (you['happy']>100){you['happy']=100}
                if (you['smarts']<0){you['smarts']=0}
  
                for(x in you['addictions']){
                        if (you['addictions'][x]['name']=='Vape'){
                            alreadyOn = true;
                        }
                    }
                    for(x in you['oldAddictions']){
                        if (you['oldAddictions'][x]['name']=='Vape'){
                            wasOn = true;
                            cocaineNumber = x;
                            alreadyOn = true;
                        }
                    }
                    if (wasOn){
                        if (randrange(2)==1){
                            $('#events').append(`<br><sh class='event'>I am addicted to Vaping again!</sh>`);
                            drugObj = 
                            {
                                name: 'Vape',
                                costYear: 200,
                                rehabChance: 5,
                                relapseChance: 30,
                            }
                            you['oldAddictions'].splice(cocaineNumber, 1);
                            you['addictions'].push(drugObj)
                        }
                    }
                    if (alreadyOn == false){
                        if (randrange(10)==1){
                            $('#events').append(`<br><sh class='event'>I am addicted to Vaping!</sh>`);
                            drugObj = 
                            {
                                name: 'Vape',
                                costYear: 200,
                                rehabChance: 5,
                                relapseChance: 30,
                            }
                            you['addictions'].push(drugObj);
                        }
                    }
                if (randrange(20)==1){
                    $('#events').append(`<br><sh class='event'>I was caught!</sh>`);
                    if (you['age']<21){
                      $('#events').append(`<br><sh class='event'>My vape was taken away.</sh>`);
                      you['happy']-=5
                      leave();
                    }
                }
                else{
                    leave()
                }
            }
            else{
              $('#events').append(`<br><sh class='event'>I did not have enough money to vape.</sh>`);
              leave();
            }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to vape!</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#cigar").on('click',function(){
          if (you['age']>=13){
            if (you['money'] >= 7){
                $('#events').append(`<br><sh class='event'>I smoked a pack of cigarrettes, it costed $7 dollars.</sh>`);
                alreadyOn=false;
                wasOn = false;
                you['money']-=7;
                you['happy']+=randrange(3)
                am = randrange(3)
                you['stoned']+=am
                totalStoned += am;
                if (you['health']<0){you['health']=0}
                if (you['happy']>100){you['happy']=100}
                if (you['smarts']<0){you['smarts']=0}
  
                for(x in you['addictions']){
                        if (you['addictions'][x]['name']=='Cigarrettes'){
                            alreadyOn = true;
                        }
                    }
                    for(x in you['oldAddictions']){
                        if (you['oldAddictions'][x]['name']=='Cigarrettes'){
                            wasOn = true;
                            cocaineNumber = x;
                            alreadyOn = true;
                        }
                    }
                    if (wasOn){
                        if (randrange(2)==1){
                            $('#events').append(`<br><sh class='event'>I am addicted to Cigarrettes again!</sh>`);
                            drugObj = 
                            {
                                name: 'Cigarrettes',
                                costYear: 100,
                                rehabChance: 5,
                                relapseChance: 50,
                            }
                            you['oldAddictions'].splice(cocaineNumber, 1);
                            you['addictions'].push(drugObj)
                        }
                    }
                    if (alreadyOn == false){
                        if (randrange(10)==1){
                            $('#events').append(`<br><sh class='event'>I am addicted to Cigarrettes!</sh>`);
                            drugObj = 
                            {
                                name: 'Cigarrettes',
                                costYear: 100,
                                rehabChance: 5,
                                relapseChance: 50,
                            }
                            you['addictions'].push(drugObj);
                        }
                    }
                if (randrange(20)==1 && you['age'] < 21){
                    $('#events').append(`<br><sh class='event'>I was caught!</sh>`);
                    if (you['age']<21){
                      $('#events').append(`<br><sh class='event'>My Cigarrettes were taken away.</sh>`);
                      you['happy']-=5
                    }
                }
                else{
                    leave()
                }
                leave();
            }
            else{
              $('#events').append(`<br><sh class='event'>I did not have enough money to buy Cigarrettes.</sh>`);
              leave();
            }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to smoke cigarrettes!</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#snortCoke").on('click',function(){
          if (you['age']>=18){
              alreadyOn = false;
              wasOn = false;
              cocaineNumber = 0;
              if (you['money']>=100){
                  you['money']-=100;
                  $('#events').append(`<br><sh class='event'>I snorted cocaine! <span style='color:red;'>-$100</span></sh>`);
                  you['happy']+=randrange(15)
                  you['smarts']-=randrange(15)
                  you['looks']-=randrange(7)
                  am = randrange(16)
                  you['stoned']+=am
                  totalStoned += am;
                  if (you['health']<0){you['health']=0}
                  if (you['happy']>100){you['happy']=100}
                  if (you['smarts']<0){you['smarts']=0}
                  if (you['looks']<0){you['looks']=0}
                  for(x in you['addictions']){
                      if (you['addictions'][x]['name']=='Cocaine'){
                          alreadyOn = true;
                      }
                  }
                  for(x in you['oldAddictions']){
                      if (you['oldAddictions'][x]['name']=='Cocaine'){
                          wasOn = true;
                          cocaineNumber = x;
                          alreadyOn = true;
                      }
                  }
                  if (wasOn){
                      if (randrange(2)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to cocaine again!</sh>`);
                          drugObj = 
                          {
                              name: 'Cocaine',
                              costYear: 1000,
                              rehabChance: 10,
                              relapseChance: 30,
                          }
                          you['oldAddictions'].splice(cocaineNumber, 1);
                          you['addictions'].push(drugObj)
                      }
                  }
                  if (alreadyOn == false){
                      if (randrange(10)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to cocaine!</sh>`);
                          drugObj = 
                          {
                              name: 'Cocaine',
                              costYear: 1000,
                              rehabChance: 10,
                              relapseChance: 40,
                          }
                          you['addictions'].push(drugObj);
                      }
                  }
                  if (randrange(6)==1){
                      $('#events').append(`<br><sh class='event'>I was caught!</sh>`);
                      sentence = randrange(3);
                      $('#events').append(`<br><sh class='event'>I am going to prison for ${sentence} year/s!</sh>`);
                      you['inPrison']=true;
                      prisShuf();
                      if (you['career']!='none'){
                          you['salary']-=you['jobSal']
                      }
                      you['career']='none';
                      $("#prisonButtons").show();
                      $("#buttons").hide();
                      $("#activities").hide();
                      $("#events").show();
                      $("#leave").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I don't have money to buy cocaine!</sh>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><sh class='event'>I am too young to do drugs!</sh>`);
              leave()
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#lsd").on('click',function(){
          if (you['age']>=18){
              alreadyOn = false;
              wasOn = false;
              cocaineNumber = 0;
              effects = ['in the middle of a desert','drinking soap','with a tattoo of a chicken on my '+choice(bodyParts),'licking the sidewalk','with a missing finger','in a swimming pool']
              if (you['money']>=200){
                  you['money']-=200;
                  $('#events').append(`<br><sh class='event'>I took LSD! <span style='color:red;'>-$200</span></sh>`);
                  $('#events').append(`<br><sh class='event'>I woke up ${choice(effects)}!</sh>`);
                  you['happy']+=randrange(20)
                  you['smarts']-=randrange(20)
                  you['looks']-=randrange(5)
                  am = randrange(10)
                  you['stoned']+=am
                  totalStoned += am;
                  if (you['health']<0){you['health']=0}
                  if (you['happy']>100){you['happy']=100}
                  if (you['smarts']<0){you['smarts']=0}
                  if (you['looks']<0){you['looks']=0}
                  for(x in you['addictions']){
                      if (you['addictions'][x]['name']=='LSD'){
                          alreadyOn = true;
                      }
                  }
                  for(x in you['oldAddictions']){
                      if (you['oldAddictions'][x]['name']=='LSD'){
                          wasOn = true;
                          cocaineNumber = x;
                          alreadyOn = true;
                      }
                  }
                  if (wasOn){
                      if (randrange(2)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to LSD again!</sh>`);
                          drugObj = 
                          {
                              name: 'LSD',
                              costYear: 3000,
                              rehabChance: 10,
                              relapseChance: 35,
                          }
                          you['oldAddictions'].splice(cocaineNumber, 1);
                          you['addictions'].push(drugObj)
                      }
                  }
                  if (alreadyOn == false){
                      if (randrange(10)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to LSD!</sh>`);
                          drugObj = 
                          {
                              name: 'LSD',
                              costYear: 3000,
                              rehabChance: 10,
                              relapseChance: 20,
                          }
                          you['addictions'].push(drugObj);
                      }
                  }
                  if (randrange(6)==1){
                      $('#events').append(`<br><sh class='event'>I was caught!</sh>`);
                      sentence = randrange(5);
                      $('#events').append(`<br><sh class='event'>I am going to prison for ${sentence} year/s!</sh>`);
                      you['inPrison']=true;
                      prisShuf();
                      if (you['career']!='none'){
                          you['salary']-=you['jobSal']
                      }
                      you['career']='none';
                      $("#prisonButtons").show();
                      $("#buttons").hide();
                      $("#activities").hide();
                      $("#events").show();
                      $("#leave").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I don't have money to buy LSD!</sh>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><sh class='event'>I am too young to do drugs!</sh>`);
              leave()
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#pcp").on('click',function(){
          if (you['age']>=18){
              alreadyOn = false;
              wasOn = false;
              cocaineNumber = 0;
              effects = ['in the middle of a desert','drinking soap','with a tattoo of a chicken on my '+choice(bodyParts),'licking the sidewalk','with a missing finger','in a swimming pool','with a cut up arm','with a missing eyeball','with a broken arm',`with a tattoo on my face`]
              if (you['money']>=200){
                  you['money']-=200;
                  $('#events').append(`<br><sh class='event'>I took PCP! <span style='color:red;'>-$200</span></sh>`);
                  $('#events').append(`<br><sh class='event'>I woke up ${choice(effects)}!</sh>`);
                  you['health']-=randrange(10);
                  you['happy']+=randrange(25)
                  you['smarts']-=randrange(25)
                  you['looks']-=randrange(20)
                  am = randrange(20)
                  you['stoned']+=am
                  totalStoned += am;
                  if (you['health']<0){you['health']=0}
                  if (you['happy']>100){you['happy']=100}
                  if (you['smarts']<0){you['smarts']=0}
                  if (you['looks']<0){you['looks']=0}
                  for(x in you['addictions']){
                      if (you['addictions'][x]['name']=='PCP'){
                          alreadyOn = true;
                      }
                  }
                  for(x in you['oldAddictions']){
                      if (you['oldAddictions'][x]['name']=='PCP'){
                          wasOn = true;
                          cocaineNumber = x;
                          alreadyOn = true;
                      }
                  }
                  if (wasOn){
                      if (randrange(2)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to PCP again!</sh>`);
                          drugObj = 
                          {
                              name: 'PCP',
                              costYear: 3000,
                              rehabChance: 10,
                              relapseChance: 35,
                          }
                          you['oldAddictions'].splice(cocaineNumber, 1);
                          you['addictions'].push(drugObj)
                      }
                  }
                  if (alreadyOn == false){
                      if (randrange(10)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to PCP!</sh>`);
                          drugObj = 
                          {
                              name: 'PCP',
                              costYear: 3000,
                              rehabChance: 10,
                              relapseChance: 20,
                          }
                          you['addictions'].push(drugObj);
                      }
                  }
                  if (randrange(6)==1){
                      $('#events').append(`<br><sh class='event'>I was caught!</sh>`);
                      sentence = randrange(5);
                      $('#events').append(`<br><sh class='event'>I am going to prison for ${sentence} year/s!</sh>`);
                      you['inPrison']=true;
                      prisShuf();
                      if (you['career']!='none'){
                          you['salary']-=you['jobSal']
                      }
                      you['career']='none';
                      $("#prisonButtons").show();
                      $("#buttons").hide();
                      $("#activities").hide();
                      $("#events").show();
                      $("#leave").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I don't have money to buy PCP!</sh>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><sh class='event'>I am too young to do drugs!</sh>`);
              leave()
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#shootHeroin").on('click',function(){
          if (you['age']>=18){
              wasOn = false;
              cocaineNumber = 0;
              alreadyOn = false;
              if (you['money']>=100){
                  you['money']-=100;
                  $('#events').append(`<br><sh class='event'>I shot heroin! <span style='color:red;'>-$100</span></sh>`);
                  you['happy']+=randrange(10)
                  you['smarts']-=randrange(10)
                  you['looks']-=randrange(5)
                  am = randrange(12)
                  you['stoned']+=am
                  totalStoned += am;
                  if (you['health']<0){you['health']=0}
                  if (you['happy']>100){you['happy']=100}
                  if (you['smarts']<0){you['smarts']=0}
                  if (you['looks']<0){you['looks']=0}
                  for(x in you['addictions']){
                      if (you['addictions'][x]['name']=='Heroin'){
                          alreadyOn = true;
                      }
                  }
                  for(x in you['oldAddictions']){
                      if (you['oldAddictions'][x]['name']=='Heroin'){
                          wasOn = true;
                          cocaineNumber = x;
                          alreadyOn = true;
                      }
                  }
                  if (wasOn){
                      if (randrange(2)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to heroin again!</sh>`);
                          drugObj = 
                          {
                              name: 'Heroin',
                              costYear: 8000,
                              rehabChance: 70,
                              relapseChance: 10,
                          }
                          you['oldAddictions'].splice(cocaineNumber, 1);
                          you['addictions'].push(drugObj)
                      }
                  }
                  if (alreadyOn == false){
                      if (randrange(3)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to heroin!</sh>`);
                          drugObj = 
                          {
                              name: 'Heroin',
                              costYear: 8000,
                              rehabChance: 70,
                              relapseChance: 8,
                          }
                          you['addictions'].push(drugObj);
                      }
                  }
                  if (randrange(10)==1){
                      $('#events').append(`<br><sh class='event'>I was caught!</sh>`);
                      sentence = randrange(3);
                      $('#events').append(`<br><sh class='event'>I am going to prison for ${sentence} year/s!</sh>`);
                      you['inPrison']=true;
                      if (you['career']!='none'){
                          you['salary']-=you['jobSal']
                      }
                      prisShuf();
                      you['career']='none';
                      $("#prisonButtons").show();
                      $("#buttons").hide();
                      $("#activities").hide();
                      $("#events").show();
                      $("#leave").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I don't have money to buy heroin!</sh>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><sh class='event'>I am too young to do drugs!</sh>`);
              leave()
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#smokeMeth").on('click',function(){
          if (you['age']>=18){
              wasOn = false;
              cocaineNumber = 0;
              alreadyOn = false;
              if (you['money']>=50){
                  you['money']-=50;
                  $('#events').append(`<br><sh class='event'>I smoked meth! <span style='color:red;'>-$50</span></sh>`);
                  you['happy']+=randrange(10)
                  you['smarts']-=randrange(10)
                  you['looks']-=randrange(5)
                  am = randrange(12)
                  you['stoned']+=am
                  totalStoned += am;
                  if (you['health']<0){you['health']=0}
                  if (you['happy']>100){you['happy']=100}
                  if (you['smarts']<0){you['smarts']=0}
                  if (you['looks']<0){you['looks']=0}
                  for(x in you['addictions']){
                      if (you['addictions'][x]['name']=='Crystal Meth'){
                          alreadyOn = true;
                      }
                  }
                  for(x in you['oldAddictions']){
                      if (you['oldAddictions'][x]['name']=='Crystal Meth'){
                          wasOn = true;
                          cocaineNumber = x;
                          alreadyOn = true;
                      }
                  }
                  if (wasOn){
                      if (randrange(2)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to crystal meth again!</sh>`);
                          drugObj = 
                          {
                              name: 'Crystal Meth',
                              costYear: 3000,
                              rehabChance: 30,
                              relapseChance: 25,
                          }
                          you['oldAddictions'].splice(cocaineNumber, 1);
                          you['addictions'].push(drugObj)
                      }
                  }
                  if (alreadyOn == false){
                      if (randrange(3)==1){
                          $('#events').append(`<br><sh class='event'>I am addicted to crystal meth!</sh>`);
                          drugObj = 
                          {
                              name: 'Crystal Meth',
                              costYear: 3000,
                              rehabChance: 30,
                              relapseChance: 30,
                          }
                          you['addictions'].push(drugObj);
                      }
                  }
                  if (randrange(6)==1){
                      $('#events').append(`<br><sh class='event'>I was caught!</sh>`);
                      sentence = randrange(10);
                      $('#events').append(`<br><sh class='event'>I am going to prison for ${sentence} year/s!</sh>`);
                      you['inPrison']=true;
                      prisShuf();
                      if (you['career']!='none'){
                          you['salary']-=you['jobSal']
                      }
                      you['career']='none';
                      $("#prisonButtons").show();
                      $("#buttons").hide();
                      $("#activities").hide();
                      $("#events").show();
                      $("#leave").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I don't have money to buy meth!</sh>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><sh class='event'>I am too young to do drugs!</sh>`);
              leave()
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#jayWalk").on('click',function(){
          if (you['age'] >= 5){
              caught = randrange(100);
              $('#events').append(`<br><sh class='event'>I decided to jay walk!</sh>`);
              if (randrange(20)==1){
                  $('#events').append(`<br><sh class='event'>I was hit by a truck!</sh>`);
                  you['health']-=randrange(20);
              }
              if (caught != 1){
                  leave();
              }
              else{
                  $('#events').append(`<br><sh class='event'>The cops actually cared!</sh>`);
                  let sentenceTime = randrange(2)
                  $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s!</sh>`);
                  sentence = sentenceTime;
                  prisShuf();
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  you['career']='none';
                  you['inPrison']=true;
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leave").hide();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to jay walk</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#arson").on('click',function(){
          if (you['age'] >= 10){
              caught = randrange(3);
              $('#events').append(`<br><sh class='event'>I decided to burn down a ${choice(buildings)}!</sh>`);
              deaths = 0;
              if (randrange(4)==1){
                deaths = randrange(16);
                $('#events').append(`<br><sh class='event'>${deaths} people were killed!</sh>`);
                you['happy']-=randrange(10);
                murders+=deaths;
              }
              if (caught != 1){
                  leave();
              }
              else{
                  $('#events').append(`<br><sh class='event'>The cops came!</sh>`);
                  let sentenceTime = randrange(20) + (10 * deaths);
                  $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s!</sh>`);
                  sentence = sentenceTime;
                  prisShuf();
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  you['career']='none';
                  you['inPrison']=true;
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leave").hide();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to commit arson</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#assault").on('click',function(){
          if (you['age'] >= 18){
              $('#events').append(`<br><sh class='event'>I assaulted someone! I ${choice(attacks)} their ${choice(bodyParts)}</sh>`);
              caught = randrange(6);
              if (caught != 1){
                  leave();
              }
              else{
                  $('#events').append(`<br><sh class='event'>They called the cops!</sh>`);
                  let sentenceTime = randrange(6)
                  $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s!</sh>`);
                  sentence = sentenceTime;
                  prisShuf();
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  you['career']='none';
                  you['inPrison']=true;
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leave").hide();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to assault someone</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#mailBall").on('click',function(){
          if (you['age'] >= 7){
              $('#events').append(`<br><sh class='event'>I went around smacking peoples mailboxes with a baseball bat.</sh>`);
              caught = randrange(6);
              if (caught != 1){
                  leave();
              }
              else{
                  $('#events').append(`<br><sh class='event'>The cops caught me!</sh>`);
                  let sentenceTime = randrange(2)
                  $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s!</sh>`);
                  sentence = sentenceTime;
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  prisShuf();
                  you['career']='none';
                  you['inPrison']=true;
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leave").hide();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to play mailbox baseball someone</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#friend").on('click',function(){
          if (randrange(5)==1){
              let friendObj = 
              {
                  "age":(randrange(60)+10),
                  "relation":30,
                  "status":'friend',
                  "money":randrange(10000),
                  "blood":false,
                  health: randrange(100),
                  happy: randrange(100),
                  smarts: randrange(100),
                  looks: randrange(100)
              }
              friendObj['gender']=choice(genders);
              if (friendObj['gender']=='Male'){
                  friendObj['first_name']=choice(mNames);
              }
              else{
                  friendObj['first_name']=choice(fNames);
              }
              friendObj['last_name']=choice(lNames);
              friendObj['full_name']=friendObj['first_name']+' '+friendObj['last_name'];
              you['relationships'].push(friendObj);
              $('#events').append(`<br><sh class='event'>I made a new friend named ${friendObj['full_name']}!</sh>`);
          }
          else{
              let acquaintance = 
              {
                  "age":(randrange(60)+10),
                  "relation":20,
                  "status":'acquaintance',
                  "money":randrange(10000),
                  "blood": false,
                  health: randrange(100),
                  happy: randrange(100),
                  smarts: randrange(100),
                  looks: randrange(100)
              }
              acquaintance['gender']=choice(genders);
              if (acquaintance['gender']=='Male'){
                  acquaintance['first_name']=choice(mNames);
              }
              else{
                  acquaintance['first_name']=choice(fNames);
              }
              acquaintance['last_name']=choice(lNames);
              acquaintance['full_name']=acquaintance['first_name']+' '+acquaintance['last_name'];
              you['relationships'].push(acquaintance);
              $('#events').append(`<br><sh class='event'>I talked with someone named ${acquaintance['full_name']}!</sh>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#murder").on('click',function(){
          if (you['age'] >= 18){
              caught = randrange(5);
              if (caught != 1){
                  if (randrange(3)==1){
                      theirName = choice(mNames)+' '+choice(lNames);
                  }else{
                      theirName = choice(fNames)+' '+choice(lNames);
                  }
                  $('#events').append(`<br><sh class='event'>I murdered a person named ${theirName}</sh>`);
                  murders++;
                  leave();
              }
              else{
                  $('#events').append(`<br><sh class='event'>I was caught murdering someone!</sh>`);
                  murders++;
                  let sentenceTime = randrange(20)+40
                  $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s!</sh>`);
                  sentence = sentenceTime;
                  you['inPrison']=true;
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  prisShuf();
                  you['career']='none';
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leave").hide();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to kill someone</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#robber").on('click',function(){
          if (you['age'] >= 18){
              amount = randrange(100);
              caught = randrange(4);
              if (caught != 1){
                  you['money']+=amount;
                  $('#events').append(`<br><sh class='event'>I stole <span style='color:green;font-weight:bolder;'>$${amount}</span> from someone</sh>`);
                  leave();
              }
              else{
                  $('#events').append(`<br><sh class='event'>I was caught robbing someone!</sh>`);
                  let sentenceTime = randrange(7)
                  $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s!</sh>`);
                  sentence = sentenceTime;
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  prisShuf();
                  you['inPrison']=true;
                  you['career']='none';
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leave").hide();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to rob someone</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#porchPirate").on('click',function(){
          if (you['age'] >= 10){
              amount = randrange(80);
              caught = randrange(6);
              items = ['doll house','baseball bat','sponge','diamond chain','toy car']
              if (caught != 1){
                  you['money']+=amount;
                  $('#events').append(`<br><sh class='event'>I stole a <span style='color:green;font-weight:bolder;'>${choice(items)}</span> from someones mailbox, I collected <span style='color:green;font-weight:bolder;'>$${amount}</span> for the item</sh>`);
                  leave();
              }
              else{
                  $('#events').append(`<br><sh class='event'>I was caught commiting porch pirate someone!</sh>`);
                  let sentenceTime = randrange(7)
                  $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s!</sh>`);
                  sentence = sentenceTime;
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  prisShuf();
                  you['inPrison']=true;
                  you['career']='none';
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leave").hide();
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to commit porch pirate</sh>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#date").on('click',function(){
          let single = true;
          for(x in you['relationships']){
              if (you['relationships'][x]['status']=='girlfriend'||you['relationships'][x]['status']=='boyfriend'){
                  single=false;
              }
          }
          if (you['age'] > 12){
              if (single){
                  chance = Math.floor(you['looks']/10);
                  if (randrange(11 - chance)){
                      let them = 
                      {
                          last_name: choice(lNames),
                          relation: randrange(60),
                          money: randrange(10000),
                          blood: false,
                          health: randrange(100),
                          happy: randrange(100),
                          smarts: randrange(100),
                          looks: randrange(100)
                      }
                      if(you['gender']=='Male'){
                          them['gender'] = 'Female'
                          them['status'] = 'girlfriend'
                          them['first_name']=choice(fNames);
                      }else{
                          them['gender'] = 'Male'
                          them['first_name']=choice(mNames);
                          them['status'] = 'boyfriend'
                      }
                      you['happy']+=5;
                      if (randrange(3)==1){
                          them['age']=you['age']-randrange(10);
                      }else{
                          them['age']=you['age']+randrange(10);
                      }
                      them['full_name']=them['first_name']+' '+them['last_name'];
                      $('#events').append(`<br><sh class='event'>My new ${them['status']} is named ${them['full_name']}</sh>`);
                      you['relationships'].push(them);
                      lovers++;
                  }
                  else{
                      $('#events').append(`<br><sh class='event'>I was rejected by someone, they told me I was too ${choice(meanWords)} to date.</sh>`);
                  }
              }
              else{
                  for (x in you['relationships']){
                      if (you['relationships'][x]['status']=='girlfriend'||you['relationships'][x]['status']=='boyfriend'||you['relationships'][x]['status']=='wife'||you['relationships'][x]['status']=='husband'||you['relationships'][x]['status']=='fiance'){
                          statNow = you['relationships'][x]['status']
                      }
                  }
                  $('#events').append(`<br><sh class='event'>I thought about cheating on my ${statNow}</sh>`);
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I am too young to date.</sh>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#goToDoctor").on('click',function(){
          if (you['money'] >= 200){
              you['money'] -= 200;
              $('#events').append(`<br><sh class='event'>I went to the doctor <span style='color:red'>-$200</span></sh>`);
              
              // General health improvement
              you['health'] += randrange(20) + 10;
              if (you['health'] > 100) { you['health'] = 100; }
              
              // Try to cure diseases
              if (you['diseases'].length > 0) {
                  for(let i = you['diseases'].length - 1; i >= 0; i--) {
                      let disease = you['diseases'][i];
                      if (randrange(disease['cureChance']) == 1) {
                          $('#events').append(`<br><sh class='event'>The doctor cured my ${disease['name']}!</sh>`);
                          you['diseases'].splice(i, 1);
                          break; // Only cure one disease per visit
                      } else {
                          $('#events').append(`<br><sh class='event'>The doctor said my ${disease['name']} needs more treatment.</sh>`);
                      }
                  }
              } else {
                  $('#events').append(`<br><sh class='event'>The doctor said I'm in good health!</sh>`);
              }
              
              // Small chance of discovering a new disease
              if (randrange(50) == 1) {
                  let newDisease = choice(diseases);
                  you['diseases'].push(newDisease);
                  $('#events').append(`<br><sh class='event'>The doctor discovered I have ${newDisease['name']}!</sh>`);
              }
          } else {
              $('#events').append(`<br><sh class='event'>I can't afford to go to the doctor!</sh>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      });

      $(".activity").on('click',function(){
          let activity = activities[Number($(this).attr('id'))];
          if (you['health'] >= activity['healthReq']){
              if (you['age'] >= activity['ageReq']){
                  if (you['happy']>=activity['happyReq']){
                      if (you['money'] >= activity['moneyReq']){
                          if (you['looks']>=activity['looksReq']){
                              if (you['smarts']>=activity['smartsReq']){
                                  $('#events').append(`<br><sh class='event'>${activity['text']}</sh>`);
                                  if (activity['done'] == false){
                                      you['health']+=activity['health']
                                      you['happy']+=activity['happy']
                                      you['looks']+=activity['looks']
                                      you['smarts']+=activity['smarts']
                                      you['comedy']+=activity['comedy']
                                      if (you['health']>100){you['health']=100};
                                      if (you['happy']>100){you['happy']=100};
                                      if (you['looks']>100){you['looks']=100};
                                      if (you['smarts']>100){you['smarts']=100};
                                      if (you['comedy']>100){you['comedy']=100};
                                  }
                                  you['money']+=activity['money']
                                  you['money']-=activity['moneyReq']
                                  activity['done']=true;
                              }else{
                                  $('#events').append(`<br><sh class='event'>I was too dumb to do what I wanted</sh>`);
                              }
                          }
                          else{
                              $('#events').append(`<br><sh class='event'>I was too ugly to do what I wanted</sh>`);
                          }
                      }
                      else{
                          $('#events').append(`<br><sh class='event'>I was too poor to do what I wanted</sh>`);
                      }
                  }
                  else{
                      $('#events').append(`<br><sh class='event'>I was too depressed to do what I wanted</sh>`);
                  }
              }
              else{
                  $('#events').append(`<br><sh class='event'>I was too young to do what I wanted</sh>`);
              }
          }
          else{
              $('#events').append(`<br><sh class='event'>I was too unhealthy to do what I wanted</sh>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  })
  
  $("#relationshipsButton").on('click',function(){
      $("#buttons").hide();
      $("#leave").show();
      $("#relationships").show();
      $("#relationships").html('');
      $("#events").hide();
      $("#relationships").append(`<small class='italic'>Click on a relationship card to view more..</small><br><br>`)
      for(x in you['relationships']){
          let person = you['relationships'][x];
          if (person['bad']==undefined){
              person['bad']=randrange(3);
          }
          if (person['drugs']==undefined){
            person['drugs']=randrange(3);
        }
          if (person['career']==undefined){
              if (person['age'] >= 18){
                  if (randrange(2)==1){
                      person['career']='none'
                  }
                  else{
                      person['career']=choice(careers);
                  }
              }
              else{
                  person['career']='none'
              }
          }
          if (person['relation'] < 0){person['relation']=0};
          if (person['health'] < 0){person['health']=0};
          if (person['looks'] < 0){person['looks']=0};
          if (person['happy'] < 0){person['happy']=0};
          if (person['smarts'] < 0){person['smarts']=0};
          $("#relationships").append(`
              <div id='${x}' class='human'>
                  <h3 class='inf'>${person['full_name']}</h3>
                  <small class='inf'>${person['status']}</small>
                  <div>
                      Relation
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width:${person['relation']}px'>
                          </div>
                      </div>
                  </div>
                  <br>
              </div>
              <br>
          `)
          $(".human").on('click',function(){
              $("#relationships").html('');
              let rnHuman = you['relationships'][Number($(this).attr('id'))];
              x=Number($(this).attr('id'))
              jobDisp = 'none';
              if (rnHuman['career'] != 'none'){
                  jobDisp = rnHuman['career']['title'];
              }
              $("#relationships").append(`
                  <center><h1>${rnHuman['full_name']}</h1>
                  <p class='infoPerson'>Age: <span style='color: orange; font-weight: bolder;'>${rnHuman['age']}</span></p>
                  <p class='infoPerson'>Gender: <span style='color: orange; font-weight: bolder;'>${rnHuman['gender']}</span></p>
                  <p class='infoPerson'>Status: <span style='font-weight: bolder;'>${rnHuman['status']}</span></p>
                  <p class='infoPerson'>Money: <span style='color: green; font-weight: bolder'>$${comify(rnHuman['money'])}</span></p>
                  <p class='infoPerson'>Career: <span style='color: green; font-weight: bolder'>${jobDisp}</span></p>
                  <br>
                  <div>
                      Relation
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width:${rnHuman['relation']}px'>
                          </div>
                      </div>
                  </div>
                  <br>
                  <div>
                      Looks
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width:${rnHuman['looks']}px'>
                          </div>
                      </div>
                  </div>
                  <br>
                  <div>
                      Smarts
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width:${rnHuman['smarts']}px'>
                          </div>
                      </div>
                  </div>
                  <br>
                  <div>
                      Health
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width:${rnHuman['health']}px'>
                          </div>
                      </div>
                  </div>
                  <br>
                  <div>
                      Happiness
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width:${rnHuman['happy']}px'>
                          </div>
                      </div>
                  </div>
                  <br>
                  <div id='${x}div2' class='buttonGrid'><button id='${x}' class='hang hangOut'>Hang Out With Them</button>
                  <button id='${x}' class='hang argue'>Argue With Them</button>
                  <button id='${x}' class='hang fight'>Fight them</button>
                  <button id='${x}' class='hang compliment'>Compliment Them</button>
                  <button id='${x}' class='hang payThem'>Give Them Money</button>
                  <button id='${x}' class='hang doctorsThem'>Take them to the doctors</button>
                  <button id='${x}' class='hang spreadRumor'>Spread a rumor about them</button>
                  <button id='${x}' class='hang insult'>Insult Them</button>
                  <button id='${x}' class='hang spendTime'>Spend Time With Them</button>
                  </div>
              `)
  
              if (rnHuman['age']>15 && you['age'] >= 10){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang murderThem'>Murder Them</button>
                  `)
              }
  
              if (rnHuman['status']=='son'||rnHuman['status']=='daughter'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang giveAd'>Give Advice</button>
                  `)
              }
              if (rnHuman['status']!='son'&&rnHuman['status']!='daughter'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang moneyAsk'>Ask for Money</button>
                  `)
              }
              if (rnHuman['blood'] != true && rnHuman['status'] != 'girlfriend' && rnHuman['status'] != 'boyfriend' && you['gender'] != rnHuman['gender']&&rnHuman['status'] != 'wife' && rnHuman['status'] != 'husband' && rnHuman['status'] != 'fiance' && you['age']>=18){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang hookWith'>Hook Up With Them</button>
                  `)
              }
              if (rnHuman['blood'] != true && rnHuman['status'] != 'girlfriend' && rnHuman['status'] != 'boyfriend' && you['gender'] != rnHuman['gender']&&rnHuman['status'] != 'wife'&&rnHuman['status'] != 'husband'&&rnHuman['status'] != 'fiance'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang askOut'>Ask them out</button>
                  `)
              }
              if(rnHuman['status'] == 'girlfriend'||rnHuman['status'] == 'boyfriend' || rnHuman['status']=='wife' || rnHuman['status']=='husband' || rnHuman['status'] == 'fiance'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang goOnDate'>Go on a date</button>
                      <button id='${x}' class='hang haveChild'>Have a child</button>
                      <button id='${x}' class='hang loveMake'>Make Love</button>
                  `)
              }
      
              if(rnHuman['status'] == 'girlfriend'||rnHuman['status'] == 'boyfriend'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang propose'>Propose To Them</button>
                  `)
              }
      
              if (rnHuman['status'] != 'father' && rnHuman['status'] != 'mother' && rnHuman['status'] != 'wife' && rnHuman['status']!='husband'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang disregard'>Disregard Them</button>
                  `)
              }
              if(rnHuman['status'] == 'girlfriend'||rnHuman['status'] == 'boyfriend'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang breakUp'>Break Up</button>
                  `)
              }
      
              if (rnHuman['status'] == 'wife'||rnHuman['status']=='husband'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang divorce'>Divorce</button>
                  `)
              }
      
              if(rnHuman['status'] == 'fiance'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang callOff'>Call Off Engagement</button>
                      <button id='${x}' class='hang elope'>Elope Now</button>
                  `)
              }

              $(".spendTime").on('click',function(){
                who = you['relationships'][Number($(this).attr('id'))];
                  $("#relationships").html(`
                  <center>
                    <small class='italic'>What would you like to do with your ${who['status']}, ${who['full_name']}</small>
                    <br>
                    <button class='hang schoolbox' id='pingPong'>Play Ping Pong</button>
                    <br>
                    <button class='hang schoolbox' id='chess'>Play Chess</button>
                    <br>
                    <button class='hang schoolbox' id='robSomeone'>Rob Someone With them</button>
                    <br>
                    <button class='hang schoolbox' id='smokeWithThem'>Smoke pot with them</button>
                  </center
                  `)

                  $("#smokeWithThem").on('click',function(){
                      if (you['age'] > 13){
                          if (who['age']>13){
                            $("#events").append(`<br><sh class='event'>I asked my ${who['status']}, ${who['full_name']} if they would like to smoke pot with me.</sh>`)
                            if (who['relation']>40){
                                if (who['drugs']==1){
                                    if (who['money'] >= 20){
                                        $("#events").append(`<br><sh class='event'>They said yes. We smoked pot together.</sh>`)
                                        who['money']-=20
                                        who['relation'] += randrange(10);
                                        you['happy']+=randrange(5);
                                        who['happy']+=randrange(5);
                                        amou = randrange(3);
                                        you['stoned']+=amou
                                        totalStoned+=amou;
                                        if (who['happy']>100){who['happy']=100}
                                        if (who['relation']>100){who['relation']=100}
                                        leave();
                                    }
                                    else{
                                        if (you['money']>=20){
                                            $("#events").append(`<br><sh class='event'>They said yes. They told me they did not have enough money. So I pitched in <span style='color:green'>$20</span> to buy the weed.</sh>`)
                                            who['relation'] += randrange(10);
                                            you['money']-=20;
                                            you['happy']+=randrange(5);
                                            who['happy']+=randrange(5);
                                            amou = randrange(3)
                                            you['stoned']+=randrange(amou)
                                            totalStoned += amou
                                            if (who['happy']>100){who['happy']=100}
                                            if (who['relation']>100){who['relation']=100}
                                            leave();
                                        }
                                        else{
                                            $("#events").append(`<br><sh class='event'>They wanted to smoke weed with me, but neither of us had the money to do so.</sh>`)
                                        }
                                    }
                                }
                                else{
                                    $("#events").append(`<br><sh class='event'>They said no. They told me that smoking pot was an unhealthy and bad habit.</sh>`)
                                    who['relation']-=randrange(10)
                                }
                            }
                            else{
                                $("#events").append(`<br><sh class='event'>They said no. They told me they don't feel comfortable enough with me.</sh>`)
                            }
                          }
                          else{
                            $("#events").append(`<br><sh class='event'>${who['status']}, ${who['full_name']} is too young to smoke pot.</sh>`)
                          }
                      }
                      else{
                        $("#events").append(`<br><sh class='event'>I am too young to smoke weed with my ${who['status']}, ${who['full_name']}.</sh>`)
                      }
                      if (who['relation']>100){who['relation']=100}
                      if (who['relation']<0){who['relation']=0}
                      leave();
                      update();
                  })

                  $("#robSomeone").on('click',function(){
                      if (you['age'] > 6){
                          if (who['age']>6){
                            $("#events").append(`<br><sh class='event'>I asked my ${who['status']}, ${who['full_name']} if they would help me rob someone.</sh>`)
                        if (who['relation'] > randrange(50)){
                            if (who['bad']==1){
                                amount = randrange(500);
                                if (randrange(10)!=1){
                                    $("#events").append(`<br><sh class='event'>They said yes. They watched to make sure nobody saw us and we robbed a person for <span style='color:green'>$${amount}</span>. We split the money 50/50</sh>`)
                                    who['relation'] += randrange(15);
                                    you['money']+=Math.floor(amount/2)
                                    who['money']+=Math.floor(amount/2)
                                    you['happy']+=randrange(5);
                                    if (who['relation']>100){who['relation']=100}
                                    leave();
                                }
                                else{
                                    $("#events").append(`<br><sh class='event'>They said yes. But sadly we were caught by the police while in the act of robbing the person!</sh>`)
                                    sentence = randrange(10);
                                    $('#events').append(`<br><sh class='event'>I am going to prison for ${sentence} year/s!</sh>`);
                                    you['inPrison']=true;
                                    prisShuf();
                                    prisonInmates.push(who);
                                    if (you['career']!='none'){
                                        you['salary']-=you['jobSal']
                                    }
                                    you['career']='none';
                                    $("#prisonButtons").show();
                                    $("#buttons").hide();
                                    $("#activities").hide();
                                    $("#relationships").hide();
                                    $("#events").show();
                                    $("#leave").hide();
                                }   
                                }
                                else{
                                    $("#events").append(`<br><sh class='event'>They said that robbery is against their morals.</sh>`)
                                    who['relation']-=randrange(10)
                                    leave();
                                }
                            }
                            else{
                                $("#events").append(`<br><sh class='event'>My ${who['status']}, ${who['full_name']} did not want to rob someone with me.</sh>`)
                                leave();
                            }
                          }
                          else{
                            $("#events").append(`<br><sh class='event'>${who['status']}, ${who['full_name']} is too young to rob someone with me.</sh>`)
                            leave();
                          }
                      }
                      else{
                        $("#events").append(`<br><sh class='event'>I wanted to rob someone with my ${who['status']}, ${who['full_name']}, but I was too young.</sh>`)
                        leave();
                      }
                      if (who['relation']>100){who['relation']=100}
                      if (who['relation']<0){who['relation']=0}
                      update();
                })

                  $("#pingPong").on('click',function(){
                      if (who['relation'] > randrange(50)){
                        $("#events").append(`<br><sh class='event'>I played ping pong with my ${who['status']}, ${who['full_name']}.</sh>`)
                        who['relation'] += randrange(5);
                        you['happy']+=randrange(5);
                        if (who['relation']>100){who['relation']=100}
                      }
                      else{
                        $("#events").append(`<br><sh class='event'>My ${who['status']}, ${who['full_name']} said they would rather not play ping pong with me.</sh>`)
                      }
                      leave();
                      update();
                  })
                  $("#chess").on('click',function(){
                    if (who['relation'] > randrange(50)){
                      $("#events").append(`<br><sh class='event'>I played chess with my ${who['status']}, ${who['full_name']}.</sh>`)
                      who['relation'] += randrange(5);
                      you['smarts']+=randrange(5);
                      if (who['relation']>100){who['relation']=100}
                    }
                    else{
                      $("#events").append(`<br><sh class='event'>My ${who['status']}, ${who['full_name']} said they would rather not play chess with me.</sh>`)
                    }
                    leave();
                    update();
                })
              })
  
              $(".spreadRumor").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (confirm(`Are you sure you want to spread a rumor about your, ${who['status']}, ${who['full_name']}?`)){
                    $("#events").append(`<br><sh class='event'>I spread a rumor about my ${who['status']}, ${who['full_name']}. I told everyone that they ${choice(rumors)}</sh>`)
                    who['relation']-=randrange(20);
                    if (randrange(5)==1){
                      $("#events").append(`<br><sh class='event'>They fought me!</sh>`)
                      for(let x = 0; x<=randrange(3); x++){
                        $("#events").append(`<br><sh class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</sh>`)
                        you['health']-=randrange(10)
                      }
                    }
                    if (who['relation']<0){who['relation']=0}
                    leave();
                    update();
                    var objDiv = document.getElementById("events");
                    objDiv.scrollTop = objDiv.scrollHeight;
                  }
              })
  
              $(".insult").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];;
                  if (confirm(`Are you sure you want to insult your, ${who['status']}, ${who['full_name']}?`)){
                    $("#events").append(`<br><sh class='event'>I told my ${who['status']}, ${who['full_name']}, that they are ${choice(meanWords)}</sh>`)
                    who['relation']-=randrange(10);
                    if (randrange(7)==1){
                      $("#events").append(`<br><sh class='event'>They fought me!</sh>`)
                      for(let x = 0; x<=randrange(3); x++){
                        $("#events").append(`<br><sh class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</sh>`)
                        you['health']-=randrange(10)
                      }
                    }
                    if (who['relation']<0){who['relation']=0}
                    leave();
                    update();
                    var objDiv = document.getElementById("events");
                    objDiv.scrollTop = objDiv.scrollHeight;
                  }
              })
  
              $('.murderThem').on('click',function(){
                who = you['relationships'][Number($(this).attr('id'))];
                if (confirm(`Are you sure you want to kill your, ${who['status']}, ${who['full_name']}?`)){
                  $("#events").append(`<br><sh class='event'>I attempted to murder my ${who['age']} year old ${who['status']}, ${who['full_name']}!</sh>`)
                  if (who['health']>randrange(60) && randrange(3)==1){
                      $("#events").append(`<br><sh class='event'>They started to beat me up!</sh>`)
                      you['health']-=randrange(50);
                      if (you['health']<0){you['health']=0};
                      if (randrange(2)==1){
                          $("#events").append(`<br><sh class='event'>They called the cops!</sh>`)
                          let sentenceTime = randrange(30)+5
                          $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s for attempted murder!</sh>`);
                          sentence = sentenceTime;
                          if (you['career']!='none'){
                              you['salary']-=you['jobSal']
                          }
                          prisShuf();
                          you['inPrison']=true;
                          you['career']='none';
                          $("#prisonButtons").show();
                          $("#buttons").hide();
                          $("#relationships").hide();
                          $("#events").show();
                          $("#leave").hide();
                      }
                      else{
                          leave();
                      }
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>I killed my ${who['status']}, ${who['full_name']}!</sh>`)
                      murders++;
                      if (you['age'] < 18 && you['age'] >= 5){
                        for(z in you['school']['classmates']){
                          y = you['school']['classmates'][z]
                          if (y == who){
                            you['school']['classmates'].splice(z, 1);
                          }
                        }
                      }
                      you['happy']-=randrange(10);
                      if (you['happy']<0){you['happy']=0}
                      you['relationships'].splice(Number($(this).attr('id')),1);
                      if (randrange(2)==1){
                          $("#events").append(`<br><sh class='event'>The cops found out it was me!</sh>`)
                          let sentenceTime = randrange(10)+40
                          $('#events').append(`<br><sh class='event'>I am going to prison for ${sentenceTime} year/s for murder!</sh>`);
                          sentence = sentenceTime;
                          if (you['career']!='none'){
                              you['salary']-=you['jobSal']
                          }
                          you['inPrison']=true;
                          you['career']='none';
                          $("#prisonButtons").show();
                          $("#buttons").hide();
                          $("#relationships").hide();
                          $("#events").show();
                          $("#leave").hide();
                      }
                      else{
                          leave();
                      }
                  }
                  update();
                }
              })
  
              $('.doctorsThem').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (you['money']>=100){
                      $("#events").append(`<br><sh class='event'>I asked my ${who['status']}, ${who['full_name']}, to come to the doctors with me.</sh>`)
                      you['money']-=100
                      if (who['relation']>randrange(60) || who['status']=='son' || who['status'] == 'daughter'){
                          $("#events").append(`<br><sh class='event'>They let me take them to the doctors! <span style='color: red;'>-$100</span></sh>`)
                          who['health']+=randrange(10);
                          if (who['health']>100){who['health']=100};
                          who['relation']+=randrange(10);
                          if (who['relation']>100){who['relation']=100}
                      }
                      else{
                          $("#events").append(`<br><sh class='event'>They were insulted!</sh>`)
                          who['relation']-=randrange(10);
                          if (who['relation']<0){who['relation']=0};
                      }
                  }else{
                      $("#events").append(`<br><sh class='event'>I don't have the money to take ${who['full_name']} to the doctors.</sh>`)
                  }
                  leave();
                  update();
              })
  
              $(".hookWith").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (who['relation']>randrange(80)){
                      if (randrange(3)==1){
                          $("#events").append(`<br><sh class='event'>I hooked up with my ${who['status']}, ${who['full_name']}.</sh>`)
                          lovers++;
                          who['relation']+=randrange(5);
                          you['happy']+=randrange(5);
                          if (randrange(5)==1){
                              let stdGiven = choice(stds);
                              $("#events").append(`<br><sh class='event'>I contracted ${stdGiven['name']}!</sh>`)
                              who['relation']-=randrange(20);
                              you['happy']-=randrange(10)
                              you['diseases'].push(stdGiven);
                          }
                          if (randrange(4)==1){
                              for(x in you['relationships']){
                                  whoNow = you['relationships'][x];
                                  if (whoNow['status']=='girlfriend'||whoNow['status']=='boyfriend'||whoNow['status']=='fiance'||whoNow['status']=='wife'||whoNow['status']=='husband'){
                                      $("#events").append(`<br><sh class='event'>My ${whoNow['status']} found out!</sh>`)
                                      whoNow['relation']-=randrange(30);
                                      you['happy']-=randrange(10);
                                  }
                              }
                          }
                      }
                      else{
                          $("#events").append(`<br><sh class='event'>My ${who['status']}, ${who['full_name']}, did not want to hookup with me.</sh>`)
                          who['relation']-=randrange(10);
                      }
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>My ${who['status']}, ${who['full_name']}, did not want to hookup with me.</sh>`)
                      who['relation']-=randrange(10);
                  }
                  leave();
                  update();
              })
          
              $(".payThem").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  let amountGive = prompt(`How Much do you want to pay your ${who['status']}?`,randrange(you['money']))
                  if (amountGive == ''){
                      amountGive = 0;
                  }
                  if (amountGive.includes('/')){
                    amountGive=0;
                  }
                  if (Number(amountGive) == NaN){
                      amountGive = 0;
                  }
                  if (Number(amountGive)==null){
                      amountGive = 0;
                  }
                  if (Number(amountGive) > you['money']){
                      amountGive = you['money'];
                  }
                  if (Number(amountGive) < 0){
                      amountGive = 0;
                  }
                  who['money']+=Number(amountGive);
                  you['money']-=Number(amountGive);
                  who['relation']+=randrange(amountGive/randrange(50));
                  if (who['relation']>100){who['relation']=100}
                  $("#events").append(`<br><sh class='event'>I gave my ${who['status']}, ${who['full_name']}, <span style='color:green;'>$${comify(amountGive)}</span> dollars.</sh>`)
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
  
              $('.loveMake').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I made love to my ${who['status']}, ${who['full_name']}.</sh>`)
                  if (randrange(2)==1){
                      $("#events").append(`<br><sh class='event'>They did not enjoy it!</sh>`)
                      who['relation']-=2;
                      if (who['relation']<0){who['relation']=0};
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>They enjoyed it!</sh>`)
                      who['relation']+=2;
                      if (who['relation']>100){who['relation']=100};
                      who['relation']+=randrange(10);
                      if (who['relation']>100){who['relation']=100};
                  }
                  leave();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $('.giveAd').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I gave advice to my ${who['status']}, ${who['full_name']}.</sh>`)
                  if (randrange(3)==1){
                      $("#events").append(`<br><sh class='event'>They did not like my advice!</sh>`)
                      who['smarts']-=2;
                      if (who['smarts']<0){who['smarts']=0};
                      who['relation']-=randrange(10);
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>They appreciated the advice!</sh>`)
                      who['smarts']+=2;
                      if (who['smarts']>100){who['smarts']=100};
                      who['relation']+=randrange(10);
                      if (who['relation']>100){who['relation']=100};
                  }
                  leave();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $(".haveChild").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I asked my ${who['status']}, ${who['full_name']}, to have a child with me</sh>`)
                  if (who['relation'] > randrange(100)){
                      if (randrange(3)==1){
                          $("#events").append(`<br><sh class='event'>They said yes!</sh>`)
                          childGender = choice(genders);
                          if (childGender=='Male'){babyList = mNames;}
                          else{babyList=fNames};
                          childName = prompt(`Child Name, your child is a ${childGender}`,choice(babyList))
                          if (childName == ''){
                              childName=choice(babyList);
                              $("#events").append(`<br><sh class='event'>Your ${who['status']} named the child ${childName}</sh>`)
                          }
                          else{
                              $("#events").append(`<br><sh class='event'>You named the child ${childName}</sh>`);
                          }
                          childName.split(' ').join('');childName+=' ';
                          let childObj = {
                              age: 0,
                              relation: 50,
                              first_name: childName,
                              last_name: you['last_name'],
                              full_name: childName + " " + you['last_name'],
                              gender: childGender,
                              blood: true,
                              money: 0,
                              happy: randrange(100),
                              health: randrange(100),
                              looks: randrange(100),
                              smarts: randrange(100),
                          }
                          if (childObj['gender']=='Male'){childObj['status']='son'}
                          if (childObj['gender']=='Female'){childObj['status']='daughter'}
                          you['relationships'].push(childObj);
          
                      }else{
                          $("#events").append(`<br><sh class='event'>They said they aren't sure if its the right time</sh>`)
                          who['relation']-=1;
                      }
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>They said you aren't close enough</sh>`)
                      who['relation']-=5;
                  }
                  leave()
                  update()
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $(".divorce").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (confirm(`Are you sure you want to divorce your, ${who['status']}, ${who['full_name']}?`)){
                    $("#events").append(`<br><sh class='event'>I have divorced my ${who['status']}, ${who['full_name']}.</sh>`)
                    who['relation']-=100;
                    who['happy']-=50;
                    if (who['happy']<0){who['happy']=0}
                    who['status']='ex';
                    if (you['money']>who['money']){
                        payThem = Math.floor(you['money']*0.1);
                        $("#events").append(`<br><sh class='event'>I had to pay them <span style='color:red;'>$${comify(pay)}</span></sh>`)
                        you['money']-=payThem
                    }else{
                        payMe = Math.floor(who['money']*0.1);
                        $("#events").append(`<br><sh class='event'>They had to pay me <span style='color:green;'>$${comify(payMe)}</span></sh>`)
                        you['money']+=payMe
                    }
                    leave();
                    update();
                    var objDiv = document.getElementById("events");
                    objDiv.scrollTop = objDiv.scrollHeight;
                  }
              })
          
              $(".elope").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I am now married to ${who['full_name']}.</sh>`)
                  if (who['gender']=='Male'){who['status']='husband'};
                  if (who['gender']=='Female'){who['status']='wife'};
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $(".callOff").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (confirm(`Are you sure you want to call of your engagement with your, ${who['status']}, ${who['full_name']}?`)){
                    $("#events").append(`<br><sh class='event'>I called off the engagement with ${who['full_name']}.</sh>`)
                    who['relation']-=10;
                    if (who['gender']=='Male'){who['status']='boyfriend'};
                    if (who['status']=='Female'){who['status']='girlfriend'};
                    leave();
                    update();
                    var objDiv = document.getElementById("events");
                    objDiv.scrollTop = objDiv.scrollHeight;
                  }
              })
          
              $(".propose").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I proposed to my ${who['status']}, ${who['full_name']}.</sh>`)
                  if (who['relation']>randrange(40)+50){
                      if (randrange(3)==1){
                          who['status']='fiance';
                          who['relation']+=20
                          you['happy']+=randrange(20);
                          if (you['happy']>100){you['happy']=100};
                          if (who['relation']>100){who['relation']=100};
                          $("#events").append(`<br><sh class='event'>${who['full_name']} is now my ${who['status']}</sh>`);
                      }else{
                          $("#events").append(`<br><sh class='event'>They said they didn't feel ready!</sh>`)
                          who['relation']-=5;
                      }
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>They said that you aren't close enough!</sh>`)
                      who['relation']-=5;
                  }
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $('.askOut').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I asked out my ${who['status']}, ${who['full_name']}.</sh>`)
                  topMax = 10-(who['relation']/10)
                  if (topMax < 2){
                      topMax = 2
                  }
                  if (randrange(topMax)==1){
                      single = true;
                      for (x in you['relationships']){
                          if (you['relationships'][x]['status']=='girlfriend'||you['relationships'][x]['status']=='boyfriend'){
                              single=false;
                          }
                      }
                      if (single){
                          if (you['age']>12){
                              if (true){
                                  $("#events").append(`<br><sh class='event'>They said yes, we are now dating</sh>`)
                                  lovers++;
                                  if (who['gender']=='Male'){
                                      who['status']='boyfriend';
                                  }else{
                                      who['status']='girlfriend'
                                  }
                                  who['relation']+=10
                              }
                              else{
                                  $("#events").append(`<br><sh class='event'>I suddenly realized that they are too old for me.</sh>`)
                              }
                          }
                          else{
                              $("#events").append(`<br><sh class='event'>Then realized I'm too young to date.</sh>`)
                          }
                      }else{
                          $("#events").append(`<br><sh class='event'>I suddenly realized I'm already in a relationship</sh>`);
                      }
                  }else{
                      $("#events").append(`<br><sh class='event'>They rejected me!</sh>`)
                      who['relation']-=5;
                  }
                  if (who['relation']>100){
                      who['relation']=100;
                  }
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $('.goOnDate').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I went on a date with my ${who['status']}, ${who['full_name']}.</sh>`)
                  who['relation']+=5;
                  if (who['relation']>100){
                      who['relation']=100;
                  }
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $('.disregard').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (confirm(`Are you sure you want to disregard your, ${who['status']}, ${who['full_name']}?`)){
                    $("#events").append(`<br><sh class='event'>I cut out connections with my ${who['status']}, ${who['full_name']}.</sh>`)
                    you['relationships'].splice(Number($(this).attr('id')),1);
                    if (who['status']=='son'||who['status']=='daughter'){
                        for(x in you['relationships']){
                            person = you['relationships'][x];
                            if (person['status']=='wife'||person['status']=='husband'||person['status']=='girlfriend'||person['status']=='boyfriend'||person['status']=='fiance'){
                                person['relation']-=randrange(50);
                            }
                        }
                    }
                    leave();
                    update();
                    var objDiv = document.getElementById("events");
                    objDiv.scrollTop = objDiv.scrollHeight;
                  }
              })
          
              $('.fight').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (confirm(`Are you sure you want to fight your, ${who['status']}, ${who['full_name']}?`)){
                    $("#events").append(`<br><sh class='event'>I fought my ${who['status']}, ${who['full_name']}.</sh>`)
                    who['relation']-=randrange(20);
                    for(let x = 0; x<=randrange(3); x++){
                        $("#events").append(`<br><sh class='event'>I ${choice(attacks)} their ${choice(bodyParts)}!</sh>`)
                    }
                    for(let x = 0; x<=randrange(3); x++){
                        $("#events").append(`<br><sh class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</sh>`)
                    }
                    if (randrange(3)==1){
                        $("#events").append(`<br><sh class='event'>I won the fight!</sh>`)
                        who['health']-=randrange(20);
                        if (who['health']<0){who['health']=0}; 
                    }else{
                        $("#events").append(`<br><sh class='event'>They won the fight!</sh>`)
                        you['health']-=randrange(20);
                        if (you['health']<0){you['health']=0}; 
                    }
                    you['fights']++;
                    leave();
                    update();
                    var objDiv = document.getElementById("events");
                    objDiv.scrollTop = objDiv.scrollHeight;
                  }
              })
          
              $('.compliment').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I complimented my ${who['status']}, ${who['full_name']}. I told them they are ${choice(compliments)}</sh>`)
                  who['relation']+=randrange(4);
                  who['happy']+=randrange(4);
                  if (who['relation']>100){who['relation']=100}
                  if (who['happy']>100){who['happy']=100};
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $('.argue').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I argued with my ${who['status']}, ${who['full_name']}. We argued about ${choice(argueAbout)}</sh>`)
                  who['relation']-=5;
                  leave();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $(".breakUp").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $('#events').append(`<br><sh class='event'>I broke up with ${who['full_name']}</sh>`);
                  you['happy']-=5;
                  leave();
                  who['status']='ex';
                  who['relation']-=20;
              })
          
              $(".moneyAsk").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I asked my ${who['status']}, ${who['full_name']}, for money.</sh>`)
                  who['relation']--;
                  if (who['relation'] > randrange(100)){
                      if (who['money'] > 0){
                          if (you['age']>13){
                              amount = randrange(Math.floor(who['money']/50))
                          you['money']+=amount;
                          who['money']-=amount;
                          $("#events").append(`<br><sh class='event'>They said yes and gave me <span style='color: green; font-weight: bolder;'>$${amount}</span></sh>`)
                          }else{
                              $("#events").append(`<br><sh class='event'>They said I was too young.</sh>`)
                              who['relation']--;
                          }
                      }
                      else{
                          $("#events").append(`<br><sh class='event'>They told me they are broke.</sh>`)
                      }
                  }else{
                      $("#events").append(`<br><sh class='event'>They said we aren't close enough.</sh>`)
                      who['relation']--;
                  }
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $('.hangOut').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><sh class='event'>I hung out with my ${who['status']}, ${who['full_name']}. We ${choice(hungOutDo)}.</sh>`)
                  who['relation']+=randrange(10);
                  if (who['relation']>100){
                      who['relation']=100;
                  }
                  leave();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          })
      }
  
  })
  
  function leave(){
      $("#buttons").show();
      $("#events").show();
      $("#relationships").hide();
      $("#leave").hide();
      $("#activities").hide();
      $("#popup").hide();
      $("#careers").hide();
      $("#finance").hide();
      $("#buttons2").hide();
      $("#youInfo").hide();
      $("#popup2").hide();
  }
  function prisonLeave(){
      $("#prisonButtons").show();
      $("#buttons").hide();
      $("#events").show();
      $("#relationships").hide();
      $("#leave").hide();
      $("#activities").hide();
      $("#popup").hide();
      $("#careers").hide();
      $("#finance").hide();
      $("#buttons2").hide();
      $("#youInfo").hide();
      $("#popup2").hide();
      $("#prisonLeave").hide()
  }
  function dieLeave(){
      $("#relationships").hide();
      $("#leave").hide();
      $("#activities").hide();
      $("#popup").hide();
      $("#popup2").hide();
      $("#careers").hide();
      $("#finance").hide();
      $("#buttons2").hide();
      $("#youInfo").hide();
  }
  
  prisWork = false;
  prisCry = false;
  prisEsc = false;
  
  $("#prisonYard").on('click',function(){
    $("#prisonLeave").show();
    $("#events").hide();
    $("#relationships").html('');
    $("#relationships").show();
    $("#prisonButtons").hide()
    $("#relationships").append(`
      <small class='italic'>Click on inmate card to view information.</small>
    `)
    for(x in prisonInmates){
      let inmate = prisonInmates[x];
      $("#relationships").append(`
        <div class='inmate' id='${x}'>
          <h4 class='teachName'>${inmate['full_name']}</h4>
            <small>${inmate['status']}</small>
            <div>
                Relation
                <div class='healthBar'>
                    <div class='healthMiddle' style='width: ${inmate['relation']}px'>
                    </div>
                </div>
            </div>
            <br>
        </div>
        <br>
      `)
    }
    $(".inmate").on('click',function(){
      inmate = prisonInmates[Number($(this).attr('id'))];
      thing = Number($(this).attr('id'))
      $("#relationships").html('');
      $("#relationships").append(`
        <center>
    <h4 class='teachName'>${inmate['full_name']}</h4>
    <small>${inmate['status']}</small>
    <br>
    <small style='color:orange'>Age: ${inmate['age']}</small>
    <br><br>
    <div>
        Relation
        <div class='healthBar'>
            <div class='healthMiddle' style='width: ${inmate['relation']}px'>
            </div>
        </div>
    </div>
    <br>
    <div>
        Looks
        <div class='healthBar'>
            <div class='healthMiddle' style='width: ${inmate['looks']}px'>
            </div>
        </div>
    </div>
    <br>
    <div>
        Smarts
        <div class='healthBar'>
            <div class='healthMiddle' style='width: ${inmate['smarts']}px'>
            </div>
        </div>
    </div>
    <br>
    <div id='buttonsRn'>
        <button class='hang schoolbox' id='talkWith'>Talk to them</button>
        <br>
        <button class='hang schoolbox' id='attack'>Attack Them</button>
        <br>
        <button class='hang schoolbox' id='workForEm'>Help Them</button>
        <br>
        <button class='hang schoolbox' id='murderThem'>Murder Them</button>
        <br>
    </div>
  </center>
      `)
      if (inmate['status'] != 'friend'){
          $("#buttonsRn").append(`<button class='hang schoolbox' id='friendThem'>Befriend Them</button><br>`)
      }
        $("#friendThem").on('click',function(){
            $("#events").append(`<br><sh class='event'>I asked my fellow inmate, ${inmate['full_name']}, if they want to keep in contact after our sentences.</sh>`);
            if (randrange(11-(inmate['relation']/10))==1){
                $("#events").append(`<br><sh class='event'>They told me they would love to.</sh>`);
                you['happy']-=randrange(5);
                inmate['relation']+=randrange(10);
                inmate.job = 'none';
                inmate.status = 'friend';
                you['relationships'].push(inmate);
            }
            else{
                $("#events").append(`<br><sh class='event'>They told me they would rather not.</sh>`);
                inmate['relation']-=randrange(10);
            }
            if (inmate['relation'] < 0){inmate['relation']=0}
            if (inmate['relation'] > 100){inmate['relation']=100}
            prisonLeave();
            update();
        })
        $("#murderThem").on('click',function(){
            $("#events").append(`<br><sh class='event'>I attempted to murder my fellow inmate, ${inmate['full_name']}.</sh>`);
            inmate['relation'] -= randrange(20);
            if (inmate['relation'] < 0){inmate['relation']=0}
            if (randrange(2)==1){
              $("#events").append(`<br><sh class='event'>I began to attack them and they attacked me first! They ${choice(attacks)} my ${choice(bodyParts)}</sh>`);
              you['health']-=randrange(20);
            }
            else{
                $("#events").append(`<br><sh class='event'>I successfully killed them!</sh>`);
                murders++;
                prisonInmates.splice(thing, 1)
            }
            if (randrange(3)==1){
              more = randrange(25);
              sentence += more;
              $("#events").append(`<br><sh class='event'>The guards found out this went down! My sentence has been extended ${more} year/s.</sh>`);
            }
            prisonLeave();
            update();
          })
        $("#workForEm").on('click',function(){
            tasks = ['clean their feet','wash their sheets','clean their toilet']
            $("#events").append(`<br><sh class='event'>I helped my fellow inmate, ${inmate['full_name']}, I helped them ${choice(tasks)}</sh>`);
            inmate['relation'] += randrange(10);
            if (randrange(4)==1){
                $("#events").append(`<br><sh class='event'>They told me I'm now their bitch.</sh>`);
                you['happy']-=randrange(5);
            }
            if (randrange(6)==1 && inmate['relation'] < 10){
                $("#events").append(`<br><sh class='event'>They told me that I am awful at everything and should die.</sh>`);
                inmate['relation']-=randrange(20);
            }
            if (inmate['relation'] < 0){inmate['relation']=0}
            if (inmate['relation'] > 100){inmate['relation']=100}
            prisonLeave();
            update();
        })

      $("#attack").on('click',function(){
        $("#events").append(`<br><sh class='event'>I attacked my inmate, ${inmate['full_name']}, I ${choice(attacks)} their ${choice(bodyParts)}</sh>`);
        inmate['relation'] -= randrange(20);
        if (inmate['relation'] < 0){inmate['relation']=0}
        if (randrange(2)==1){
          $("#events").append(`<br><sh class='event'>They attacked me! They ${choice(attacks)} my ${choice(bodyParts)}</sh>`);
          you['health']-=randrange(10);
        }
        if (randrange(3)==1){
          more = randrange(5);
          sentence += more;
          $("#events").append(`<br><sh class='event'>The guards found out! My prison sentence has been extended ${more} years.</sh>`);
        }
        prisonLeave();
        update();
      })

      $("#talkWith").on('click',function(){
        if (inmate['relation'] < randrange(50)){
          $("#events").append(`<br><sh class='event'>My inmate, ${inmate['full_name']}, laughed at me for talking to them!</sh>`);
        }
        else{
          $("#events").append(`<br><sh class='event'>Me and a fellow inmate, ${inmate['full_name']}, talked for a while.</sh>`);
          inmate['relation'] += randrange(10);
          if (inmate['realtion'] > 100){inmate['relation']= 100};
        }
        prisonLeave()
        update();
      })
    })
  })

  prisRead = false;
  
  $("#prisonAct").on('click',function(){
    $("#prisonLeave").show();
    $("#events").hide();
    $("#activities").html('');
    $("#activities").show();
    $("#prisonButtons").hide()
    $("#activities").append(`
      <center>
      <small class='italic'>Prison Years Left: ${sentence}</small>  
        <br>
        <button class='schoolbox hang' id='cry'>Cry In Your Cell</button>
        <br>
        <button class='schoolbox hang' id='workout'>Workout</button>
        <br>
        <button class='schoolbox hang' id='visit'>Conjugal Visit</button>
        <br>
        <button class='schoolbox hang' id='escape'>Escape Prison</button>
        <br>
        <button class='schoolbox hang' id='readBook'>Read a book</button>
        <br>
        <button class='schoolbox hang' id='haircut'>Get a haircut</button>
      </center>
    `)
    $("#haircut").on('click',function(){
        $("#events").append(`<br><sh class='event'>I got a haircut from my fellow inmate named ${choice(prisonInmates)['full_name']}.</sh>`)
        if (randrange(3)==1){
            $("#events").append(`<br><sh class='event'>The haircut was awful and they accidentally cut part of my head.</sh>`)
            you['looks']-=randrange(3)
        }
        else{
            $("#events").append(`<br><sh class='event'>The haircut was a good cut.</sh>`)
            you['looks']+=randrange(3)
        }
        if (you['looks']>100){you['looks']=100}
        if (you['looks']<0){you['looks']=0}
        prisonLeave()
        update();
      })
    $("#escape").on('click',function(){
      $("#events").append(`<br><sh class='event'>I attempted to escape prison!</sh>`)
      if (randrange(50)==1){
        if (prisEsc == false){
          you['inPrison']=false;
          $("#events").append(`<br><sh class='event'>I escaped prison!</sh>`);
          $("#buttons").show();
          $("#prisonButtons").hide();
          $("#prisonLeave").hide();
          you['happy']+=randrange(20);
          leave();
        }
      }
      else{
        $("#events").append(`<br><sh class='event'>I failed to escape</sh>`)
        prisEsc = true;
        you['happy']-=randrange(5);
        prisonLeave();
      }
      update();
    })
    $("#visit").on('click',function(){
      $("#events").append(`<br><sh class='event'>I requested for someone I know to visit me in prison!</sh>`)
      if (randrange(2)==1){
        if (you['relationships'].length > 0){
          person = choice(you['relationships']);
          $("#events").append(`<br><sh class='event'>My ${person['status']}, ${person['full_name']}, came to visit me.</sh>`)
          person['relation'] += randrange(5);
          if (person['relation'] > 100){person['relation']=100}
          you['happy']+=randrange(5);
        }
        else{
          $("#events").append(`<br><sh class='event'>Nobody came to visit me.</sh>`)
          you['happy']-=randrange(5);
        }
      }
      else{
        $("#events").append(`<br><sh class='event'>Nobody came to visit me</sh>`)
        you['happy']-=randrange(5);
      }
      prisonLeave();
      update();
    })
    $("#workout").on('click',function(){
      if (you['age'] > 10){
        $("#events").append(`<br><sh class='event'>I worked out in prison.</sh>`)
        if (prisWork == false){
          you['health']+=randrange(10)
          prisWork = true;
        }
      }
      else{
        $("#events").append(`<br><sh class='event'>I tried to workout, but I couldn't even pick up the weight seeing as it wasn't intended for ${you['age']} year olds.</sh>`)
      }
      prisonLeave()
      update();
    })
    $("#readBook").on('click',function(){
        books = ['Of Mice In Men','The Hunger Games','Flowers For Algernon','Misery']
        $("#events").append(`<br><sh class='event'>I read a book titled ${choice(books)}.</sh>`)
        if (prisRead == false){
            you['smarts']+=randrange(5);
            you['happy']+=randrange(5);
            prisRead = true;
        }
        prisonLeave()
        update();
      })
    $("#cry").on('click',function(){
      $("#events").append(`<br><sh class='event'>I cried in my prison cell.</sh>`)
      if (prisCry == false){
        you['happy']+=randrange(5);
        prisCry = true;
      }
      if (randrange(5)==1){
        $("#events").append(`<br><sh class='event'>Another prisoner caught me!</sh>`)
        $("#events").append(`<br><sh class='event'>The prisoner attacked me! They ${choice(attacks)} my ${choice(bodyParts)}</sh>`)
        you['health']-=randrange(10);
      }
      prisonLeave();
      update();
    })
  })
  
  $("#leaveButton").on('click',function(){
      leave();
  })
  $("#prisonLeave").on('click',function(){
      prisonLeave();
  })
  
  //Aging up
  $(".ageButton").on('click',function(){
    prisCry = false;
    prisWork = false
    prisEsc = false;
      for(x in you['relationships']){
          let person = you['relationships'][x];
          if (person['career']==undefined){
              if (person['age'] >= 18){
                  if (randrange(2)==1){
                      person['career']='none'
                  }
                  else{
                      person['career']=choice(careers);
                  }
              }
              else{
                  person['career']='none'
              }
          }
      }
      listOfEvents = [];
      ++you['age'];
      for(x in you['relationships']){
          if (you['relationships'][x]['status']=='friend'){
              if (you['relationships'][x]['relation']<20){
                  you['relationships'][x]['status']='acquaintance';
                  $("#events").append(`<br><sh class='event'>${you['relationships'][x]['full_name']} is no longer my friend!</sh>`)
              }
          }
          if (you['relationships'][x]['status']=='acquaintance'){
              if (you['relationships'][x]['relation']>20){
                  you['relationships'][x]['status']='friend';
                  $("#events").append(`<br><sh class='event'>${you['relationships'][x]['full_name']} is now my friend!</sh>`)
              }
          }
          if (you['inPrison']){
              you['relationships'][x]['relation']-=randrange(4);
          }
          if (randrange(3)==1){you['relationships'][x]['relation']--};
          if (you['relationships'][x]['status']=='girlfriend'||you['relationships'][x]['status']=='boyfriend'){
              if(you['relationships'][x]['relation'] < randrange(50)){
                  if (randrange(5)==1){
                      person = you['relationships'][x];
                      $("#events").append(`<br><sh class='event'>My ${you['relationships'][x]['status']}, ${you['relationships'][x]['full_name']}, broke up with me</sh>`)
                      listOfEvents.push(['Heartbreak',`My ${person['status']}, ${person['full_name']} broke up with me!`,'linear-gradient(blue, darkblue)'])
                      you['relationships'][x]['status']='ex';
                      you['relationships'][x]['relation']-=20;
                      you['happy']-=10;
                  }
              }
          }
          you['relationships'][x]['age']++;
          if (you['relationships'][x]['age'] > randrange(40) + 80){
              $("#events").append(`<br><sh class='event'>My ${you['relationships'][x]['status']} died of old age</sh>`)
              person = you['relationships'][x];
              if (person['status'] == 'mother' || person['status']=='father'|| person['status']=='wife'|| person['status']=='husband'){
                  if (person['relation'] > randrange(80)){
                      if (person['money'] > 0){
                          inherit = randrange(person['money'])
                          $("#events").append(`<br><sh class='event'>I inherited <span style='color:green'>$${comify(inherit)}</span></sh>`);
                          you['money']+=inherit;
                      }
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>I did not inherit any of the money</sh>`);
                  }
              }
              listOfEvents.push(['Death',`My ${person['status']}, ${person['full_name']} died!`,'linear-gradient(black, gray)'])
              you['relationships'].splice(x, 1);
              you['happy']-=randrange(10);
          }
      }
      if(you['age']<5){eventList = events['baby'];eventList2 = choiceEvents['baby']}
      if(you['age']>=5 && you['age'] < 13){eventList = events['child'];eventList2 = choiceEvents['child']}
      if(you['age']>=13 && you['age']<18){eventList=events['teen'];eventList2 = choiceEvents['teen']}
      if(you['age']>=18){eventList=events['adult'];eventList2 = choiceEvents['adult']}
      if (you['inPrison']){eventList=events['prison'];eventList2 = choiceEvents['prison']}
      console.log(eventList2);
      $("#events").append(`
          <br><br>
          <sh class='ageSpot'>Age: <span class='age'>${you['age']}</span></sh>
      `)
      if (you['inPrison']==false){
          if (randrange(10)==1){
              listOfEvents.push(choice(eventList2));
          }
      }
      for(let x = 0; x<randrange(4); x++){
          eventNow = choice(eventList);
          $("#events").append(`<br><sh class='event'>${eventNow['text']}</sh>`)
          you['events'].push({event: {age: you['age'], happened: eventNow}});
          you['health']+=eventNow['health'];
          you['happy']+=eventNow['happy'];
          you['looks']+=eventNow['looks'];
          you['smarts']+=eventNow['smarts'];
          you['money']+=eventNow['money'];
          you['comedy']+=eventNow['comedy'];
      }
      if (you['health']>100){you['health']=100};
      if (you['happy']>100){you['happy']=100};
      if (you['looks']>100){you['looks']=100};
      if (you['smarts']>100){you['smarts']=100};
      if (you['comedy']>100){you['comedy']=100};
      if (you['inPrison']){
          sentence--;
          ++you['prisonYears']
          if (sentence <= 0){
              you['inPrison']=false;
              $("#events").append(`<br><sh class='event'>I was released from prison</sh>`);
              listOfEvents.push(['Freedom',`You were released from prison!`,'linear-gradient(#DE745C, #E67D2C)'])
              $("#buttons").show();
              $("#prisonButtons").hide();
          }
      }
      if (you['happy']<=0){
          you['health']-=randrange(2);
      }
      for(x in you['relationships']){
          person = you['relationships'][x];
          let change = randrange(3)
          if (change==1){
              person['health']+=randrange(3)
              person['happy']+=randrange(3)
              person['looks']+=randrange(3)
              person['smarts']+=randrange(3)
              if (person['health']>100){person['health']=100}
              if (person['happy']>100){person['happy']=100}
              if (person['looks']>100){person['looks']=100}
              if (person['smarts']>100){person['smarts']=100}
          }else{
              person['health']-=randrange(3)
              person['happy']-=randrange(3)
              person['looks']-=randrange(3)
              person['smarts']-=randrange(3)
              if (person['health']<=0){person['health']=0}
              if (person['happy']<=0){person['happy']=0}
              if (person['looks']<=0){person['looks']=0}
              if (person['smarts']<=0){person['smarts']=0}
          }
          if (you['inPrison']==false){
              if (person['status']=='son'||person['status']=='daughter'){
                  you['money']-=2000
              }
          }
          if (randrange(10)==1){
              if (you['inPrison']==false){
                  if (person['relation']<15){
                      $("#events").append(`<br><sh class='event'>My ${person['status']}, ${person['full_name']}, told me they hate me.</sh>`);
                      person['relation']-=randrange(5)
                      you['happy']-=1;
                  }
              }
          }
          if (randrange(20)==1){
              if (you['inPrison']==false){
                  if (person['relation']<15){
                      you['fights']++;
                      $("#events").append(`<br><sh class='event'>My ${person['status']}, ${person['full_name']}, fought me.</sh>`);
                      person['relation']-=randrange(20)
                      if (person['relation']<0){person['relation']=0}
                      for(let x = 0; x<=randrange(3); x++){
                          $("#events").append(`<br><sh class='event'>I ${choice(attacks)} their ${choice(bodyParts)}!</sh>`)
                      }
                      for(let x = 0; x<=randrange(3); x++){
                          $("#events").append(`<br><sh class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</sh>`)
                      }
                      damage = 0
                      if (randrange(3)==1){
                          $("#events").append(`<br><sh class='event'>I won the fight!</sh>`)
                          person['health']-=randrange(20);
                          damage = randrange(5);
                          you['health']-=damage
                      }else{
                          $("#events").append(`<br><sh class='event'>They won the fight!</sh>`)
                          damage = randrange(20)
                          you['health']-=damage;
                          person['health']-=randrange(5);
                      }
                      if (you['health']<0){you['health']=0;}
                      if (person['health']<0){person['health']=0;}
                      listOfEvents.push(['Fight!',`You got into a fight with your ${person['status']}, ${person['full_name']}! 
                      <div>
                          Damage
                          <div class='healthBar' style='border:2px solid black;'> 
                              <div class='healthMiddle' style='background:linear-gradient(orange,red);width:${Math.floor(damage*4)}px;'>
  
                              </div>
                          </div>
                      </div>`,'linear-gradient(#ff0000, #dc143c)'])
                  }
              }
          }
          if (randrange(10)==1){
              if (you['inPrison']==false){
                  if (person['relation']>20){
                      $("#events").append(`<br><sh class='event'>My ${person['status']}, ${person['full_name']}, hung out with me.</sh>`);
                      person['relation']+=randrange(5);
                      if (person['relation']>100){
                          person['relation']=100;
                      }
                      you['happy']+=randrange(5);
                  }
              }
          }
          if (randrange(150)==1){
              $("#events").append(`<br><sh class='event'>My ${person['status']}, ${person['full_name']}, died of ${choice(deaths)}.</sh>`);
              listOfEvents.push(['Death',`My ${person['status']}, ${person['full_name']} died!`,'linear-gradient(black, gray)'])
              you['happy']-=randrange(20);
              if (person['status'] == 'mother' || person['status']=='father'|| person['status']=='wife'|| person['status']=='husband'){
                  if (person['relation'] > randrange(80)){
                      if (person['money'] > 0){
                          inherit = randrange(person['money'])
                          $("#events").append(`<br><sh class='event'>I inherited <span style='color:green'>$${comify(inherit)}</span></sh>`);
                          you['money']+=inherit;
                      }
                  }
                  else{
                      $("#events").append(`<br><sh class='event'>I did not inherit any of the money</sh>`);
                  }
              }
              for(i in you['school']['classmates']){
                  currentRel = you['school']['classmates'][i];
                  if (currentRel['full_name']==person['full_name'] && currentRel['age'] == person['age'] && currentRel['health'] == person['health']){
                      you['school']['classmates'].splice(i,1)
                  }
              }
              you['relationships'].splice(x, 1);
          }else{
              if (person['happy']<=0 || person['health']<=0){
                  if (randrange(3)==1){
                      $("#events").append(`<br><sh class='event'>My ${person['status']}, ${person['full_name']}, died of health related causes</sh>`);
                      listOfEvents.push(['Death',`My ${person['status']}, ${person['full_name']} died!`,'linear-gradient(black, gray)'])
                      person = you['relationships'][x];
                      if (person['status'] == 'mother' || person['status']=='father'|| person['status']=='wife'|| person['status']=='husband'){
                          if (person['relation'] > randrange(80)){
                              if (person['money'] > 0){
                                  inherit = randrange(person['money'])
                                  $("#events").append(`<br><sh class='event'>I inherited <span style='color:green'>$${comify(inherit)}</span></sh>`);
                                  you['money']+=inherit;
                              }
                          }
                          else{
                              $("#events").append(`<br><sh class='event'>I did not inherit any of the money</sh>`);
                          }
                      }
                      you['relationships'].splice(x, 1);
                      you['happy']-=randrange(20);
                      for(i in you['school']['classmates']){
                          currentRel = you['school']['classmates'][i];
                          if (currentRel['full_name']==person['full_name'] && currentRel['age'] == person['age'] && currentRel['health'] == person['health']){
                              you['school']['classmates'].splice(i,1)
                          }
                      }
                  }
              }
          }
      }
      if (you['career']=='college student'){
          you['term']--;
          you['money']-=you['payYear'];
          you['smarts']+=randrange(12);
          if (you['smarts']>100){you['smarts']=100};
          if (you['term']==0){
              you['career']='none';
              $("#events").append(`<br><sh class='event'>I finished college</sh>`);
              listOfEvents.push(['Freedom',`You just got out of college!`,'linear-gradient(#027CD0, #5CA9DE)'])
              you['collegePoints']+=you['pointsCollege'];
          }
      }
      if (you['age']>25){
          if (you['items'].length <= 0 && you['payingOff'] <= 0){
              you['health']-=randrange(3)
              you['happy']-=randrange(3)
          }
      }
      if (you['salary'] >= 14423){
          you['money']-=14423;
      }
      if (you['age']>50){
          you['looks']-=1;
      }
      bookYear=false;
      for(x in you['books']){
          if (randrange(3)==1){
              earned = randrange(you['books'][x]['maxMoney'])
              you['money']+=earned;
              you['books'][x]['totalEarned']+=earned;
              $("#events").append(`<br><sh class='event'>My book "${you['books'][x]['title']}" earned me <span style='color:green'>$${comify(earned)}</span></sh>`);
          }
      }
  
      for(x in you['songs']){
          let currentSong=you['songs'][x];
          if (randrange(4)==1){
              earned = randrange(currentSong['maxMoney']);
              currentSong['totalEarned']+=earned;
              you['money']+=earned;
              $("#events").append(`<br><sh class='event'>My song "${currentSong['title']}" earned me <span style='color:green'>$${comify(earned)}</span></sh>`);
          }
      }
      if (you['health']<0){you['health']=0};
      if (you['happy']<0){you['happy']=0};
      if (you['looks']<0){you['looks']=0};
      if (you['smarts']<0){you['smarts']=0};
      if (you['salary']>160000){
          taxPay=0.35;
      }
      else if (you['salary']<=160000&&you['salary']>80000){
          taxPay=0.24;
      }
      else if (you['salary']<=80000&&you['salary']>40000){
          taxPay=0.22;
      }
      else if (you['salary']<=40000&&you['salary']>9000){
          taxPay=0.12;
      }
      else if (you['salary']<=9000){
          taxPay=0.10;
      }
      if (randrange(100)==1){
          let disease = choice(diseases);
          you['diseases'].push(disease);
          $("#events").append(`<br><sh class='event'>I just got the ${disease['name']} disease!</sh>`);
          listOfEvents.push(['Disease!',`You just got the ${disease['name']} disease!`,'linear-gradient(#ff4500, #8b0000)'])
      }
  
      if (you['age'] < 18){
          for(x in you['school']['classmates']){
              currentClassmate = you['school']['classmates'][x];
              if (you['school']['clique']['popularity'] > randrange(50)){
                  if (currentClassmate['relation'] < 100){
                      currentClassmate['relation']++;
                  }
              }
              if (randrange(200)==1){
                  $("#events").append(`<br><sh class='event'>My ${currentClassmate['status']}, ${currentClassmate['full_name']} died of ${choice(deaths)}!</sh>`);
                  for(i in you['relationships']){
                      currentRel = you['relationships'][i]
                          if (currentRel['full_name']==currentClassmate['full_name'] && currentRel['age'] == currentClassmate['age'] && currentRel['health'] == currentClassmate['health']){
                              you['relationships'].splice(i,1)
                              you['happy']-=randrange(10);
                          }
                  }
                  you['school']['classmates'].splice(x, 1);
              }
          }
      }
  
      for(x in you['diseases']){
          currentDisease = you['diseases'][x];
          if (randrange(currentDisease['chanceAway'])==1){
              $("#events").append(`<br><sh class='event'>Its a miracle! I was cured from ${currentDisease['name']}</sh>`);
              listOfEvents.push(['Cured!',`You no longer have ${currentDisease['name']}!`,'linear-gradient(#42C0FB, #4AC948)'])
              you['diseases'].splice(x, 1);
          }
      }
  
      for(x in you['diseases']){
          you['health']-=randrange(you['diseases'][x]['healthDown']);
          $("#events").append(`<br><sh class='event'>I continue to suffer from ${you['diseases'][x]['name']}!</sh>`);
      }
  
      you['money']+=Math.floor(you['salary'] - (you['salary'] * taxPay));
      for(x in you['items']){
          let itemNow = you['items'][x];
          you['health']+=itemNow['health'];
          you['happy']+=itemNow['happy'];
          you['money']-=you['items'][x]['yearly'];
          if (you['money']<0){
              $("#events").append(`<br><sh class='event'>I had to sell my house, ${you['items'][x]['name']}</sh>`);
              you['money']+=Math.floor(you['items'][x]['cost']*0.8);
              for(i in houses){
                  if (houses[i]['name']==you['items'][x]['name']){
                      houses[i]['own']=false;
                  }
              }
              you['items'].splice(x,1);
          }
      }
      if (you['stoned']>10){
          you['health']-=randrange(2);
          you['looks']-=randrange(2)
          you['smarts']-=randrange(2)
          you['happy']-=1;
      }
      if (you['stoned']>20){
          you['health']-=randrange(3)
          you['looks']-=randrange(3)
          you['smarts']-=randrange(3)
          you['happy']-=1;
      }
      if (you['stoned']>40){
          you['health']-=randrange(5)
          you['looks']-=randrange(4)
          you['smarts']-=randrange(4)
          you['happy']-=1;
      }
      if (you['stoned']>60){
          you['health']-=randrange(10)
          you['looks']-=randrange(5)
          you['smarts']-=randrange(5)
          you['happy']-=1;
      }
      if (you['stoned']>100){
          you['health']-=randrange(15)
          you['looks']-=randrange(8)
          you['smarts']-=randrange(8)
          you['happy']-=1;
      }
      if (you['stoned'] > 0){
        you['stoned']--;
      }
      for(x in you['school']['teachers']){
          you['school']['teachers'][x]['age']++;
      }
      for(x in you['school']['classmates']){
          if (you['school']['classmates'][x]['status'] != 'friend' && you['school']['classmates'][x]['status'] != 'enemy' && you['school']['classmates'][x]['status'] != 'girlfriend' && you['school']['classmates'][x]['status'] != 'boyfriend' && you['school']['classmates'][x]['status'] != 'fiance' && you['school']['classmates'][x]['status'] != 'wife' && you['school']['classmates'][x]['status'] != 'husband'){
              you['school']['classmates'][x]['age']++;
          }
      }
      if (you['inPrison']==false){
          if (you['age'] < 18){
              for(x in you['school']['classmates']){
                  classmateRn = you['school']['classmates'][x];
                  if (randrange(15)==1){
                      if (classmateRn['relation']>randrange(20)+40){
                          $("#events").append(`<br><sh class='event'>My classmate ${classmateRn['full_name']} told me they think I'm ${choice(compliments)}!</sh>`);
                          you['happy']+=randrange(5);
                          classmateRn['relation']+=randrange(10);
                          if (classmateRn['relation']>100){classmateRn['relation']=100}
                      }
                      else if (classmateRn['relation']<randrange(20)){
                          $("#events").append(`<br><sh class='event'>My classmate ${classmateRn['full_name']} told me they think I'm ${choice(meanWords)}!</sh>`);
                          you['happy']-=randrange(5);
                          classmateRn['relation']-=randrange(10);
                          if (classmateRn['relation']<0){classmateRn['relation']=0}
                      }
                  }
              }
          }
      }
      for(x in you['relationships']){
          if (randrange(3)==1){
              onRn = you['relationships'][x];
              if (onRn['age'] >= 18){
                  loss=randrange(1000);
                  if ((onRn['money'] - loss) < 0 && onRn['money'] > 0){
                      $("#events").append(`<br><sh class='event'>My ${onRn['status']}, ${onRn['full_name']}, is in debt</sh>`);
                  }
                  onRn['money']-=loss
              }
          }
      }
      for(x in you['relationships']){
          relationshipOn = you['relationships'][x];
          if (relationshipOn['career'] != 'none'){
              relationshipOn['money']+=Math.floor(relationshipOn['career']['salary']*0.1);
              if (randrange(3)==1){
                  relationshipOn['money']-=randrange(7000)
              }
              console.log(careers);
          }
      }
      if (you['inPrison']==false){
          if (you['age']==6||you['age']==12||you['age']==14||you['age']==18){
              thingNow = 'none'
              if (you['age']==6){
                  thingNow = 'Elementary School'
                  listOfEvents.push(['Elementary School',`You just started elementary school!`,'linear-gradient(#66CD00, #397D02)'])
                  $("#events").append(`<br><sh class='event'>I now am attending elementary school</sh>`);
              }
              if (you['age']==12){
                  thingNow = 'Middle School'
                  listOfEvents.push(['Middle School',`You just started middle school!`,'linear-gradient(#66CD00, #397D02)'])
                  $("#events").append(`<br><sh class='event'>I now am attending middle school</sh>`);
              }
              if (you['age']==14){
                  thingNow = 'High School'
                  listOfEvents.push(['High School',`You just started high school!`,'linear-gradient(#66CD00, #397D02)'])
                  $("#events").append(`<br><sh class='event'>I now am attending high school</sh>`);
              }
              if (you['age']==18){
                  $("#events").append(`<br><sh class='event'>I finished high school.</sh>`);
                  listOfEvents.push(['Freedom!',`You are done with school!!`,'linear-gradient(#027CD0, #5CA9DE)'])
              }
              newSchoolPeople(3,30,thingNow)
          }
      }
      if (you['career'] != 'college student' && you['career'] != 'none'){
          if (you['job']['healthReq'] > you['health']+10 || you['job']['smartsReq'] > you['smarts']+5 || you['job']['looksReq'] > you['looks']+5){
              if (randrange(3)==1){
                  listOfEvents.push(['Fired!',`You just got fired from your job!`,'linear-gradient(#8B4513, #A0522D)'])
                  $("#events").append(`<br><sh class='event'>I was fired from being a ${you['career']}.</sh>`);
                  you['salary']-=you['jobSal']
                  you['career']='none';
                  you['job']={}
              }
          }
      }
  
      for(x in you['songs']){
          you['songs'][x]['advertiseYear']=false
      }
      for(x in you['books']){
          you['books'][x]['advertiseYear']=false
      }
      if (you['age']>50){
          if (you['fame']>1){
              you['fame']=Math.floor(you['fame']*0.9)
          }
      }
      for(x in you['oldAddictions']){
          if (randrange(you['oldAddictions'][x]['relapseChance']) == 1){
              $("#events").append(`<br><sh class='event'>I fell back into my old habits and am addicted to ${you['oldAddictions'][x]['name']} again.</sh>`);
              listOfEvents.push(['Relapse!',`You are addicted to ${you['oldAddictions'][x]['name']} again.`,'linear-gradient(#8B4513, #A0522D)'])
              you['addictions'].push(you['oldAddictions'][x]);
              you['oldAddictions'].splice(x, 1)
          }
      }
  
      for(x in you['relationships']){
          currentRn = you['relationships'][x];
          if (currentRn['career']=='none' && currentRn['age'] >= 18){
              if (randrange(10)==1){
                  currentRn['career']=choice(careers)
                  $("#events").append(`<br><sh class='event'>My ${currentRn['status']}, ${currentRn['full_name']}, is now a ${currentRn['career']['title']}</sh>`);
              }
          }
      }
  
      for(x in you['relationships']){
          currentRn = you['relationships'][x];
          if (currentRn['career']!='none'){
              if (randrange(70)==1){
                  $("#events").append(`<br><sh class='event'>My ${currentRn['status']}, ${currentRn['full_name']}, was fired from being a ${currentRn['career']['title']}</sh>`);
                  currentRn['career']='none'
              }
          }
      }
  
      for(x in you['addictions']){
          addiction = you['addictions'][x];
          costed = randrange(addiction['costYear'])
          if (you['money'] >= costed && you['inPrison'] == false){
              you['money'] -= costed;
              you['health']-=randrange(10);
              you['smarts']-=randrange(5);
              you['looks']-=randrange(5);
              you['stoned']+=randrange(10)
              $("#events").append(`<br><sh class='event'>I spent <span style='color:red'>$${costed}</span> on ${addiction['name']} this year.</sh>`);
          }
          else{
              you['happy']-=randrange(10);
              you['health']-=randrange(3);
              if (you['inPrison'] == true){
                  $("#events").append(`<br><sh class='event'>I could not get ${addiction['name']} this year because I'm in prison.</sh>`);
              }
              else{
                  $("#events").append(`<br><sh class='event'>I could not afford to buy ${addiction['name']} this year.</sh>`);
              }
              $("#events").append(`<br><sh class='event'>It is driving me insane.</sh>`);
          }
      }
      for(x in you['payingOff']){
          let currentOne = you['payingOff'][x];
          you['money']-=Math.floor(currentOne['cost']/10);
          currentOne['years']--;
          if (currentOne['years'] == 0){
              $("#events").append(`<br><sh class='event'>I finished paying off my ${currentOne['name']}</sh>`);
              you['items'].push(currentOne);
              you['payingOff'].splice(x, 1)
          }
          if (you['money'] < 0){
              $("#events").append(`<br><sh class='event'>I had to take out a bank loan for my ${currentOne['name']}</sh>`);
          }
      }
      for (x in you['gems']){
          you['gems'][x]['shined']=false
      }
      for(x in activities){
          activities[x]['done']=false;
      }
      console.log(listOfEvents)
      if (you['dead']==false){
          if (you['inPrison'] == false){
            deadd = false
            for(x in listOfEvents){
              if (listOfEvents[x][0]=='Death!'){
                deadd=true;
              }
            }
            if (deadd == false){
              importantNew(listOfEvents);
            }
          }
      }
      if (you['inPrison'] == false){
          for(x in you['cars']){
              you['money'] -= 3000
              cars[x]['cost'] += Math.floor(cars[x]['cost'] * 0.05)
          }
      }
      /*if (you['health'] <= 0 || you['age'] > (randrange(40) + 80)){
        if (randrange(5)==1){
            $("#events").append(`<br><sh class='event'>I died.</sh>`);
            die();
        }
        }*/
      if (randrange(5)==1){
          for(let x = 0; x < randrange(5)+2; x++){
              using = choice(houseTypes);
              cost = randrange(using['range'])+using['low']
              let houseObj = {
                  "name":`${using['name']} on `+choice(lNames)+` ${choice(located)}`,
                  "cost": cost,
                  "yearly": Math.floor(cost * 0.1),
                  "health":randrange(using['helEff']),
                  "happy":randrange(using['hapEff']),
                  "own":false,
                  "fixedUp":false
              }
              if (using['name'] == 'Apartment'){
                  houseObj['yearly']=randrange(15000)+2000
              }
              houses.push(houseObj)
          }
      }
      prisRead = false;
      for(x in you['items']){
          you['items'][x]['fixedUp']=false;
      }
      update();
      if (you['happy']<0){you['happy']=0};
      if (you['looks']<0){you['looks']=0};
      if (you['smarts']<0){you['smarts']=0};
      if (you['health']>100){you['health']=100};
      if (you['happy']>100){you['happy']=100};
      if (you['looks']>100){you['looks']=100};
      if (you['smarts']>100){you['smarts']=100};
      console.log(you);
      var objDiv = document.getElementById("events");
      objDiv.scrollTop = objDiv.scrollHeight;
  })
  
  setInterval(()=>{console.clear();},1e1)
  