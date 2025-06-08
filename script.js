console.log("Script.js is loaded and running");

// --- Button functionality ---
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const startButton = document.getElementById('start-button');
    const loadButton = document.getElementById('load-button');
    const aboutButton = document.getElementById('about-button');

    startScreen.classList.add('active');
    gameScreen.classList.remove('active');

    startButton.addEventListener('click', () => {
        startScreen.classList.remove('active');
        gameScreen.classList.add('active');
        console.log('New game started');
        clearGame();
        //startGame();
    });

    loadButton.addEventListener('click', () => {
        loadGame();
    });

    aboutButton.addEventListener('click', () => {
        alert('VibeLife is a life simulation game created by Vibe Coding.\nMake choices, live with the consequences, and shape your destiny!');
    });
// End button functionality

$(document).ready(function() {
    // Check for a saved game
    if (!localStorage.getItem('vibelifeSave')) {
        $('#load-button').hide();
    } else {
        $('#load-button').text('Continue Game');
    }
});

//Load json data
Promise.all([
  fetch('data/activities.json').then(r => r.json()),
  fetch('data/events.json').then(r => r.json()),
  fetch('data/careers.json').then(r => r.json()),
  fetch('data/colleges.json').then(r => r.json()),
  fetch('data/diseases.json').then(r => r.json()),
  fetch('data/mNames.json').then(r => r.json()),
  fetch('data/fNames.json').then(r => r.json()),
  fetch('data/lNames.json').then(r => r.json())
]).then(([activitiesData, eventsData, careersData, collegesData, diseasesData, mNamesData, fNamesData, lNamesData]) => {
  activities = activitiesData.sort(() => Math.random() - 0.5);
  events = eventsData;
  careers = careersData.sort(() => Math.random() - 0.5);
  colleges = collegesData.sort(() => Math.random() - 0.5);
  diseases = diseasesData;
  mNames = mNamesData;
  fNames = fNamesData;
  lNames = lNamesData;
  startGame(); // 
}).catch(err => {
  console.error("Failed to load one or more data files:", err);
});//end json data

function comify(x) {
  if (typeof x !== "number" || isNaN(x)) return "0";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

 function update() {
     console.trace("Update called");
    // Defensive checks for nested properties
    if (you['school']) {
        if (typeof you['school']['grade'] === "number") {
            if (you['school']['grade'] > 100) you['school']['grade'] = 100;
            if (you['school']['grade'] < 0) you['school']['grade'] = 0;
        }
    }

    // Clamp core stats
    if (typeof you['happy'] === "number" && you['happy'] < 0) you['happy'] = 0;
    if (typeof you['looks'] === "number" && you['looks'] < 0) you['looks'] = 0;
    if (typeof you['smarts'] === "number" && you['smarts'] < 0) you['smarts'] = 0;
    if (typeof you['health'] === "number" && you['health'] > 100) you['health'] = 100;
    if (typeof you['happy'] === "number" && you['happy'] > 100) you['happy'] = 100;
    if (typeof you['looks'] === "number" && you['looks'] > 100) you['looks'] = 100;
    if (typeof you['smarts'] === "number" && you['smarts'] > 100) you['smarts'] = 100;
    if (typeof you['comedy'] === "number" && you['comedy'] > 100) you['comedy'] = 100;

    // Update stat bars
    $("#looks").css('width', (you['looks'] || 0) + 'px');
    $("#happy").css('width', (you['happy'] || 0) + 'px');
    $("#smarts").css('width', (you['smarts'] || 0) + 'px');
    $("#health").css('width', (you['health'] || 0) + 'px');
    $("#comedy").css('width', (you['comedy'] || 0) + 'px');

    // Fame
    if (typeof you['fame'] === "number" && you['fame'] > 0) {
        $("#fameThing").show();
        $("#fameThing2").show();
        let fameWidth = Math.min(you['fame'] / 200, 100); // Never >100px
        $("#fameBar").css('width', fameWidth + 'px');
    } else {
        $("#fameThing").hide();
        $("#fameThing2").hide();
    }

    // Money
    $(".money").html('$' + comify(you['money'] || 0));

    // Name
  //  $(".name").text(you['name'] || '');

    // Age in top bar
    $(".topbar-age").text(you['age'] !== undefined ? you['age'] : '');

    // Handle "death" logic if needed
if (typeof you['health'] === "number" && you['health'] <= 0 && !you['dead']) {
    you['health'] = 0;
    // REMOVE THE RANDOMNESS FOR TESTING
    $("#events").append(`<br><p class='event'>I died from health problems</p>`);
    if (typeof die === "function") die();
    console.log("Calling die()...")
    return; // Prevent any further actions
}

    // Scroll to bottom of events
    var objDiv = document.getElementById("events");
    if (objDiv) objDiv.scrollTop = objDiv.scrollHeight;
}

function saveGame() {
    const saveData = {
        you: you,
        eventLog: eventLog // <-- This is the new persistent log!
    };
    localStorage.setItem('vibelifeSave', JSON.stringify(saveData));
}

function getGradeByAge(age) {
    // This is a basic mapping, you can adjust as needed.
    if (age < 6) return "Kindergarten";
    return (age - 5) + "th";
}

function loadGame() {
    const data = localStorage.getItem('vibelifeSave');
    if (!data) {
        alert("No saved game found. Start a new game to begin!");
        return;
    }
    const saveData = JSON.parse(data);
    you = saveData.you;
    eventLog = saveData.eventLog || []; // <-- restore or create new

    update(); // redraws UI

    // Restore event history to the event box
    $("#events").html(eventLog.map(e => `<div>${e}</div>`).join(''));

    // Show the main game screen, hide the start screen
    $('.screen').removeClass('active');
    $('#game-screen').addClass('active');
}

function clearGame() {
    console.log("remove save data");
    localStorage.removeItem('vibelifeSave');
}

var you = {};  // Global declaration
randrange = max => Math.floor(Math.random()*max);
let eventLog = [];
let choiceEvents = {};
let houses = [];
let cliques = [];
let schoolDistrict;
let genders;
let deaths;
let compliments;
let meanWords;
let argueAbout;
let hungOutDo;
let attacks;
let movTitle1;
let movTitle2;
let bodyParts;
let rumors;

$(document).on('click', '.leaveOk2', function() {
    if (you['dead'] == false) {
        leave();
        update();
    } else {
        // Death summary and end-game logic:
        let eventsHtml = document.getElementById('events').innerHTML;
        let summary = `You died, here is your life summary.`;
        let talkAbout, talkAbout2;
        if (you['gender'] == 'Male') {
            talkAbout = 'He';
            talkAbout2 = 'his';
        } else {
            talkAbout = 'She';
            talkAbout2 = 'her';
        }
        // ... (all your summary/trophy logic here) ...

        // Finalize and show
        summary += `<br><h1>${trophy}</h1>`;
        $("#summary").html(summary)
        $("#summary").append(`
            <center><div class='miniEvents'>
                ${eventsHtml}
            </div></center>
        `);

        $("#summary").show();
        $("#playAgain").show();
        $(".ageButton").hide();
        $(".bottom-options").hide();
        $("#stats").hide();
    }
})

function die() {
    console.log("die function here");
    you['dead'] = true;
    clearGame(); 
    listOfEvents = [];
    listOfEvents.push(['Death!', 'You Died!', 'linear-gradient(#000000,#2e0909)']);
    importantNew(listOfEvents); // triggers lessBig() for the death popup
}

 function dieLeave(){
      $("#relationships").hide();
      $("#leaveButton").hide();
      $("#activities").hide();
      $("#popup").hide();
      $("#popup2").hide();
      $("#careers").hide();
      $("#finance").hide();
      $("#buttons2").hide();
      $("#youInfo").hide();
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
                  $(".age-button-container").hide();
                  $(".bottom-options").hide();
                  $("#stats").hide();

                  let head = listName[x][0]
                  let text = listName[x][1]
                  let color = listName[x][2]

                // Determine if the background is dark
                let isDark = color.includes('black') || color.includes('#000') || color.includes('gray');

                // Choose class names based on background
                let textClass = isDark ? 'event-on-dark' : '';
                let headClass = isDark ? 'event-on-dark' : '';

                $("#popup").html(`
  <center>
    <div id='${x}popup' class='poper' style='background:${color}'>
      <h1 id='head' class='${headClass}'>${head}</h1>
      <p id='text' class='${textClass}'>${text}</p>
      <button class='button option big leaveOk'>Ok</button>
    </div>
  </center>
`);

              }
              else{
                  $("#events").hide();
                  $("#popup").show();
                  $("#buttons").hide();
                  $("#buttons2").show();
                  $(".age-button-container").hide();
                  $(".bottom-options").hide();
                  $("#stats").hide();
                  itemNow = listName[x];
                  head = itemNow[0];
                  text = itemNow[1];
                  color = itemNow[2];
                  button1 = itemNow[3];
                  button2 = itemNow[4];
                  response1 = itemNow[5];
                  response2 = itemNow[6];
              //    console.log(itemNow[7])
                  effectsObject = {"function":itemNow[7]};
                  effectsObject2 = {"function":itemNow[8]}
                  $("#popup").css('background', 'rgba(0,0,0,0)') //listName[0][2])
                  $("#popup").append(`
                      <div id='${x}popup' class='poper' style='background:${color}'>
                      <center>
                      <h1 id='head'>${head}</h1>
                      <p id='text'>${text}</p>
                      <br><br>
                      <button class='button option giant buttonClicked' data-did='7' id='${x}' data-effects='${effectsObject}' data-response='${response1}'>${button1}</button>
                      <br><br>
                      <button class='button option giant buttonClicked' data-did='8' id='${x}' data-effects='${effectsObject2}' data-response='${response2}'>${button2}</button>
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
                  $(".ageButton").hide();
              }
          }
          $(`#${on}popup`).remove();
          on++;
          if (on < listName.length){
               $("#popup").css('background', 'rgba(0,0,0,0)') //listName[on][2])
          }
      })
      $(".buttonClicked").on('click',function(){
          let eventText = $(this).attr('data-response');
          $("#events").append(`<br><p class='event'>${$(this).attr('data-response')}</p>`);
          eventLog.push(eventText);
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
                  $(".ageButton").hide();
              }
          }
          $(`#${on}popup`).remove();
          on++
          if (on < listName.length){
             // $("#popup").css('background',listName[on][2])
          }
  
      })
  }

function leave(){
      $(".bottom-options").show();
      $(".age-button-container").show();
      $("#stats").show();
      $("#events").show();
      $("#relationships").hide();
      $("#leaveButton").hide();
      $("#activities").hide();
      $("#popup").hide();
      $("#careers").hide();
      $("#finance").hide();
      $("#buttons2").hide();
      $("#youInfo").hide();
      $("#popup2").hide();
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
       //   console.log(cliques);
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

//Start Game  
function startGame() {
    let lovers = 0;
    let murders = 0;
    let totalStoned = 0;
    let buildings = ['hotel','condo','hospital','apartment','grocery store']
    genders = ['Male','Female'];
    let pastPeople = [];

  if (!you['deathAge']) you['deathAge'] = randrange(40) + 80;
    
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
  
  choice = listName => listName[Math.floor(Math.random()*listName.length)];
  
  
  let traits = 
  [
      {
          name:'Skinny',
          healthYear: 0,
          looksYear: 0,
          comedyYear: 0
      }
  ]
      
  for(x in activities){
      activities[x]['done']=false
  }
  
 houses =
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

  choiceEvents = 
  {
      "baby":[
          ['Toys!','You found a toy on the ground? Will you take it?','linear-gradient(#ff8c00,#ff4500)','Take the toy','Ignore it','I took a toy that I found on the ground.','I ignored a cool toy I saw on the ground.',
          function()
          {
              you['happy']+=2;
              if (randrange(3)==1){
                  let eventText = "The kid who owned the toy screamed at me";
                  $("#events").append(`<br><p class='event'>The kid who owned the toy screamed at me</p>`);
                  eventLog.push(eventText);
              }else{
                  let eventText = "I could see the owner of the toy crying";
                  $("#events").append(`<br><p class='event'>I could see the owner of the toy crying</p>`);
                  eventLog.push(eventText);
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
  
  compliments = 'stellar,awesome,chill,funny,nice,lit,super,fun,cool';compliments=compliments.split(',');
  hungOutDo = 'went fishing,went exploring abandoned caves,went surfing,went skating,went swimming,ate at a fancy restaurant,watched a movie,went on a hike,walked on the beach,went for a walk,went to the park';hungOutDo=hungOutDo.split(',');
  argueAbout = 'who has more money,who is cooler,Lil Tecca,music types';argueAbout=argueAbout.split(',');
  meanWords = 'lame,stupid,ugly,annoying,moronic,idiotic,filthy,creepy';meanWords=meanWords.split(',');
  deaths = 'a heart attack,a drug overdose,an ongoing health problem,a car accident';deaths=deaths.split(',');
  
  movTitle1 = 'Journey,Recipe,Flight,Sanctuary,Home,Castle,Quick,Philosophy,Grasshopper,Day,Money,Dawn,Killer,Huskies,Leaves,Summer,Dark,Dance,Crying,Unmasking,The mask,Square,Kill the man';movTitle1=movTitle1.split(',');
  movTitle2 = 'of hell,in time,of the zombies,in the dark,disaster,moon,maker,farmer,at dawn,in the sunlight,crash,room,of the penguins,to go,monday,Squid,of power,for you';movTitle2=movTitle2.split(',');
  bodyParts = `kneecap,bellybutton,finger,chest,neck,leg,arm,fist,tongue,belly,eyes,back,face`;bodyParts=bodyParts.split(',');
  attacks = `lacerated,crippled,broke,slapped,punched,bit,busted,crushed,spanked,headbutted,smashed,kicked,touched,popped,cut,shot,shanked,cracked,destroyed,drop-kicked`;attacks=attacks.split(',');
  rumors = `are gay,have no friends,are a virgin,have herpes,have mental problems,are not mentally stable,are a murderer,have a tattoo of a dog crap`;rumors=rumors.split(',');
  
  cliques =
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

you = 
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
  if(you['gender']=='Male'){you['first_name']=choice(mNames);}
  else(you['first_name']=choice(fNames));
  you['last_name']=choice(lNames);
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
  $("#leaveButton").hide();
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
  schoolDistrict = choice(lNames);
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
  
function lessBig(head, text, color) {
    leave();
    $("#popup2").html('');
    $('#events').hide();
    $("#popup2").show();
    $("#buttons").hide();
    $("#buttons2").show();
    $(".age-button-container").hide();
    $(".bottom-options").hide();
    $("#stats").hide();

    $("#popup2").html(`
        <center>
        <div class='poper' style="background: ${color}">
        <h1 id='head'>${head}</h1>
        <p id='text'>${text}</p>
        <br><br>
        <button class='button option big leaveOk2'>Ok</button>
        </center>
        </div>
    `);
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
  
for (x in you['relationships']) {
    let relationNowIs = you['relationships'][x];
    let eventText = "";
    if (relationNowIs['career'] == 'none') {
        eventText = `My ${relationNowIs['status']} is ${relationNowIs['full_name']} (age ${relationNowIs['age']})`;
    } else {
        eventText = `My ${relationNowIs['status']} is ${relationNowIs['full_name']}, a ${relationNowIs['career']['title']} (age ${relationNowIs['age']})`;
    }
    $("#events").append(`<br><p class='event'>${eventText}</p>`);
    eventLog.push(eventText);
}
      update();
  }
  
  $(".name").on('click',function(){
      if (you['dead']==false && you['inPrison'] == false){
          leave();
          $("#youInfo").show();
          $("#buttons").hide();
          $("#leaveButton").show();
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
                  <button class='button actionButton' id='theme'>Change Theme</button>
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
                          <button class='button actionButton rehabDrugs' id='${x}'>Rehab<br><small>Cost: $1,000</small></button>
                      </div>
                  `)
              }
          }
  
$(".rehabDrugs").on('click', function () {
    currentDrug = you['addictions'][Number($(this).attr('id'))];
    if (you['money'] >= 1000) {
        you['money'] -= 1000;
        let eventText = "I went to rehab.";
        $("#events").append(`<br><p class='event'>${eventText}</p>`);
        eventLog.push(eventText);

        if (randrange(currentDrug['rehabChance']) == 1) {
            you['oldAddictions'].push(currentDrug);
            you['addictions'].splice(Number($(this).attr('id')));
            you['stoned'] -= randrange(Math.floor(you['stoned'] / 3));
            eventText = `I no longer am addicted to ${currentDrug['name']}.`;
            $("#events").append(`<br><p class='event'>${eventText}</p>`);
            eventLog.push(eventText);
            lessBig('Success!', `You are no longer addicted to ${currentDrug['name']}`, 'linear-gradient(#42C0FB, #4AC948)');
        } else {
            eventText = "Rehab was a failure.";
            $("#events").append(`<br><p class='event'>${eventText}</p>`);
            eventLog.push(eventText);
            leave();
        }
    } else {
        let eventText = "I can't afford to go to rehab.";
        $("#events").append(`<br><p class='event'>${eventText}</p>`);
        eventLog.push(eventText);
        leave();
    }
    update();
});

  
          $(".saveLife").on('click',function(){
              let thisDisease = you['diseases'][Number($(this).attr('id'))];
              if (you['money'] >= thisDisease['cost']){
                  you['money']-=thisDisease['cost'];
                  $("#events").append(`<br><p class='event'>I got treatment for my ${thisDisease['name']} disease.</p>`);
                  if (randrange(thisDisease['cureChance'])==1){
                      $("#events").append(`<br><p class='event'>I was cured for ${thisDisease['name']}!</p>`);
                      lessBig('Cured!',`You were cured for ${thisDisease['name']}`,'linear-gradient(#42C0FB, #4AC948)')
                      you['diseases'].splice(Number($(this).attr('id')),1);
                  }
                  else{
                      $("#events").append(`<br><p class='event'>I continue to suffer from ${thisDisease['name']}!</p>`);
                      leave()
                  }
              }
              else{
                  $("#events").append(`<br><p class='event'>I can't afford treatment for ${thisDisease['name']}!</p>`);
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
                      $("#events").append(`<br><p class='event'>I advertised my book, "${bookOn['title']}"</p>`);
                  }
                  else{
                      $("#events").append(`<br><p class='event'>I did not have the money to advertise my book, "${bookOn['title']}"</p>`);
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
                      $("#events").append(`<br><p class='event'>I advertised my song, "${songOn['title']}"</p>`);
                  }
                  else{
                      $("#events").append(`<br><p class='event'>I did not have the money to advertise my song, "${songOn['title']}"</p>`);
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


// Main FINANCE BUTTON: shows the finance dashboard/cards
$("#financeButton").on('click', function() {
    if (you['dead']) return;
    $("#buttons").hide();
    $(".bottom-options").hide();
    $(".age-button-container").hide();
    $("#stats").hide();
    $("#leaveButton").show();
    $("#finance").show();
    $("#finance").html('');
    $("#events").hide();

        $("#finance").append(`
      <div class="finance-section your-assets">
        <h2>🏠 Your Properties</h2>
        <button class='button sectionHighlight gray' id='youHouse'><h3>Your Houses</h3></button>
        <button class='button sectionHighlight gray' id='youCar'><h3>Your Cars</h3></button>
        <button class='button sectionHighlight gray' id='youGem'><h3>Your Gems</h3></button>
      </div>
      <div class="finance-section shop-assets">
        <h2>🛍️ Buy New Assets</h2>
        <button class='button sectionHighlight gray blueCard' id='housesShow'><h3>Houses</h3></button>
        <button class='button sectionHighlight gray blueCard' id='carShow'><h3>Cars</h3></button>
        <button class='button sectionHighlight gray blueCard' id='gemShow'><h3>Gems</h3></button>
      </div>
    `);
});
    
// --------- DELEGATED EVENTS: Attach once, always work ---------

// View and buy new gems
$("#finance").on('click', "#gemShow", function() {
    $("#finance").html('');
    if (gems.length <= 0) {
        $("#finance").append('<center><h1>No Gems Currently For Sale</h1></center>');
    } else {
        $("#finance").append(`<center><small class='italic'>Gems</small></center>`);
    }
    for (let x in gems) {
        if (gems[x]['own'] == false) {
            $("#finance").append(`
                <center><div class='house'>
                    <h3>Gem: <span style='color:green;font-weight:bolder;'>${gems[x]['name']}</span></h3>
                    <p>Cost: <span style='color:green;font-weight:bolder;'>$${comify(gems[x]['cost'])}</span></p>
                    <div>
                        Beauty
                        <div class='healthBar'>
                            <div class='healthMiddle' style='width:${gems[x]['hapEff'] * 100/9}px'></div>
                        </div>
                    </div>
                    <br>
                    <button class='button actionButton buyGem' id='${x}'>Buy Gem</button>
                </div></center>
                <br>
            `);
        }
    }
    document.getElementById('finance').scrollTop = 0;
});

// Buy a gem
$("#finance").on('click', ".buyGem", function() {
    let gemOn = gems[Number($(this).attr('id'))];
    if (you['money'] >= gemOn['cost']) {
        you['money'] -= gemOn['cost'];
        gemOn['own'] = true;
        gemOn['shined'] = false;
        you['happy'] += gemOn['hapEff'];
        you['gems'].push(gemOn);
        $('#events').append(`<br><sh class='event'>I bought a gem, ${gemOn['name']}!</sh>`);
    } else {
        $('#events').append(`<br><sh class='event'>I could not afford a ${gemOn['name']}!</sh>`);
    }
    leave();
    update();
});

// View your gems
$("#finance").on('click', "#youGem", function() {
    $("#finance").html('');
    if (you['gems'].length <= 0) {
        $("#finance").append('<center><h1>You have no gems</h1></center>');
    } else {
        $("#finance").append(`<center><small class='italic'>Your Gems</small></center>`);
    }
    for (let x in you['gems']) {
        let itemObj = you['gems'][x];
        $("#finance").append(`
            <br>
            <center><div class='item'>
                <h3>${itemObj['name']}</h3>
                <p>Value: <span style='color:green;font-weight:bolder;'>$${comify(itemObj['cost'])}</span></p>
                <div>
                    Beauty
                    <div class='healthBar'>
                        <div class='healthMiddle' style='width:${itemObj['hapEff'] * 100/9}px'></div>
                    </div>
                </div>
                <br>
                <button class='button actionButton sellGem' id='${x}'>Sell Item</button>
                <br>
                <button class='button actionButton shineGem' id='${x}'>Shine your ${itemObj['name']}</button>
            </div></center>
        `);
    }
    document.getElementById('finance').scrollTop = 0;
});

// Sell a gem
$("#finance").on('click', ".sellGem", function() {
    let gemThis = you['gems'][Number($(this).attr('id'))];
    $("#events").append(`<br><sh class='event'>I sold my gem, ${gemThis['name']}</sh>`);
    lessBig('Goodbye My Gem!', `You sold your ${gemThis['name']}`, 'linear-gradient(#659D32, #488214)');
    you['money'] += Math.floor(gemThis['cost'] * 0.8);
    gemThis['own'] = false;
    you['gems'].splice(Number($(this).attr('id')), 1);
    update();
    document.getElementById("events").scrollTop = document.getElementById("events").scrollHeight;
});

// Shine a gem
$("#finance").on('click', ".shineGem", function() {
    let gemThis = you['gems'][Number($(this).attr('id'))];
    $("#events").append(`<br><sh class='event'>I shined my gem, ${gemThis['name']}</sh>`);
    if (gemThis['shined'] == false) {
        gemThis['cost'] += Math.floor(gemThis['cost'] * 0.05);
        gemThis['shined'] = true;
    }
    leave();
    update();
    document.getElementById("events").scrollTop = document.getElementById("events").scrollHeight;
});

// View and buy new houses
$("#finance").on('click', "#housesShow", function() {
    $("#finance").html('');
    if (houses.length <= 0) {
        $("#finance").append('<center><h1>No Houses Currently For Sale</h1></center>');
    } else {
        $("#finance").append(`<center><small class='italic'>Houses</small></center>`);
    }
    for (let x in houses) {
        if (houses[x]['own'] == false) {
            $("#finance").append(`
                <center><div class='house'>
                    <h3>House: <span style='color:green;font-weight:bolder;'>${houses[x]['name']}</span></h3>
                    <p>Cost: <span style='color:green;font-weight:bolder;'>$${comify(houses[x]['cost'])}</span></p>
                    <p>Yearly: <span style='color:green;font-weight:bolder;'>$${comify(houses[x]['yearly'])}</span></p>
                    <button class='button actionButton buy' id='${x}'>Buy House</button>
                    <br>
                    <button class='button actionButton payOverTime' id='${x}'>Pay over time</button>
                </div></center>
                <br>
            `);
        }
    }
    document.getElementById('finance').scrollTop = 0;
});

// Buy a house
$("#finance").on('click', ".buy", function() {
    let houseOn = houses[Number($(this).attr('id'))];
    if (you['money'] >= houseOn['cost']) {
        you['money'] -= houseOn['cost'];
        houseOn['own'] = true;
        houseOn['fixedUp'] = false;
        you['items'].push(houseOn);
        houses.splice(Number($(this).attr('id')), 1);
        $('#events').append(`<br><sh class='event'>I bought a house, ${houseOn['name']}!</sh>`);
    } else {
        $('#events').append(`<br><sh class='event'>I cannot afford that house!</sh>`);
    }
    leave();
    update();
    document.getElementById("events").scrollTop = document.getElementById("events").scrollHeight;
});

// Pay for house over time
$("#finance").on('click', ".payOverTime", function() {
    let currentHouse = houses[Number($(this).attr('id'))];
    if (you['salary'] > (currentHouse['cost'] / 10) || you['money'] > (currentHouse['cost'] / 2)) {
        $("#events").append(`<br><sh class='event'>I am now paying off a house throughout the course of ten years.</sh>`);
        currentHouse['years'] = 10;
        currentHouse['fixedUp'] = false;
        you['payingOff'].push(currentHouse);
        houses.splice(Number($(this).attr('id')), 1);
        leave();
    } else {
        $("#events").append(`<br><sh class='event'>I couldn't afford to buy a certain house in the course of 10 years with my current salary.</sh>`);
        leave();
    }
    update();
});

// View your houses
$("#finance").on('click', "#youHouse", function() {
    $("#finance").html('');
    if (you['items'].length <= 0) {
        $("#finance").append('<center><h1>You have no houses</h1></center>');
    } else {
        $("#finance").append(`<center><small class='italic'>Your Houses</small></center>`);
    }
    for (let x in you['items']) {
        let itemObj = you['items'][x];
        $("#finance").append(`
            <br>
            <center><div class='item'>
                <h3>${itemObj['name']}</h3>
                <p>Value: <span style='color:green;font-weight:bolder;'>$${comify(itemObj['cost'])}</span></p>
                    <button class='button actionButton sell' id='${x}'>Sell Item</button>
                    <button class='button actionButton fixUp' id='${x}'>Fix Up Item</button>
                    <button class='button actionButton partyHouse' id='${x}'>Throw a Party</button>
            </div></center>
        `);
    }
    document.getElementById('finance').scrollTop = 0;
});

// Sell a house
$("#finance").on('click', ".sell", function() {
    let houseThis = you['items'][Number($(this).attr('id'))];
    $("#events").append(`<br><sh class='event'>I sold my house, ${houseThis['name']}</sh>`);
    lessBig('Goodbye My House!', `You sold your house`, 'linear-gradient(#659D32, #488214)');
    you['money'] += Math.floor(houseThis['cost'] * 0.8);
    houseThis['own'] = false;
    houseThis['fixedUp'] = false;
    you['items'].splice(Number($(this).attr('id')), 1);
    update();
    document.getElementById("events").scrollTop = document.getElementById("events").scrollHeight;
});

// Fix up house
$("#finance").on('click', ".fixUp", function() {
    let houseThis = you['items'][Number($(this).attr('id'))];
    $("#events").append(`<br><sh class='event'>I fixed up my house, ${houseThis['name']}</sh>`);
    if (houseThis['fixedUp'] == false) {
        houseThis['cost'] += Math.floor(houseThis['cost'] * 0.1);
        houseThis['fixedUp'] = true;
    }
    you['happy'] -= randrange(3);
    leave();
    update();
    document.getElementById("events").scrollTop = document.getElementById("events").scrollHeight;
});

// Throw a party in your house
$("#finance").on('click', ".partyHouse", function() {
    let houseThis = you['items'][Number($(this).attr('id'))];
    $("#events").append(`<br><sh class='event'>I arranged a party at my <span style='color: green'>$${comify(houseThis['cost'])}</span> dollar ${houseThis['name']}.</sh>`);
    if (you['relationships'].length > 0) {
        let ppl = [];
        for (let x in you['relationships']) {
            let newP = you['relationships'][x];
            if (randrange(2) == 1) {
                ppl.push(newP);
            }
        }
        let sentRn = '';
        for (let x in ppl) {
            sentRn += `My ${ppl[x]['status']}, ${ppl[x]['full_name']}, came to the party. `;
        }
        $("#events").append(`<br><sh class='event'>${sentRn}</sh>`);
        you['stoned'] += randrange(3);
        you['happy'] += randrange(3);
        for (let x in ppl) {
            ppl[x]['relation'] += randrange(5);
            if (ppl[x]['relation'] > 100) { ppl[x]['relation'] = 100 }
        }
    } else {
        $("#events").append(`<br><sh class='event'>Sadly I had to cancel plans because I did not know anyone to invite.</sh>`);
    }
    leave();
    update();
    document.getElementById("events").scrollTop = document.getElementById("events").scrollHeight;
});

// View and buy cars
$("#finance").on('click', "#carShow", function() {
    $("#finance").html('');
    if (cars.length <= 0) {
        $("#finance").append('<center><h1>No Cars Currently For Sale</h1></center>');
    } else {
        $("#finance").append(`<center><small class='italic'>Cars</small></center>`);
    }
    for (let x in cars) {
        if (cars[x]['own'] == false) {
            $("#finance").append(`
                <center><div class='house blueCar'>
                    <h3>Car: <span style='color:green;font-weight:bolder;'>${cars[x]['name']}</span></h3>
                    <p>Cost: <span style='color:green;font-weight:bolder;'>$${comify(cars[x]['cost'])}</span></p>
                    <p>Gas Cost Yearly: <span style='color:green;font-weight:bolder;'>$${comify(3000)}</span></p>
                    <button class='button actionButton buyCar' id='${x}'>Buy Car</button>
                </div></center>
                <br>
            `);
        }
    }
    document.getElementById('finance').scrollTop = 0;
});

// Buy a car
$("#finance").on('click', ".buyCar", function() {
    if (you['driversLicense'] == true) {
        let carOn = cars[Number($(this).attr('id'))];
        if (you['money'] >= carOn['cost']) {
            you['money'] -= carOn['cost'];
            carOn['own'] = true;
            carOn['fixedUp'] = false;
            you['cars'].push(carOn);
            you['happy'] += carOn['hapEff'];
            cars.splice(Number($(this).attr('id')), 1);
            $('#events').append(`<br><sh class='event'>I bought a car, ${carOn['name']}!</sh>`);
        } else {
            $('#events').append(`<br><sh class='event'>I cannot afford that car!</sh>`);
        }
    } else {
        $('#events').append(`<br><sh class='event'>I was gonna buy a car but I need a drivers license!</sh>`);
    }
    leave();
    update();
    document.getElementById("events").scrollTop = document.getElementById("events").scrollHeight;
});

// View your cars
$("#finance").on('click', "#youCar", function() {
    $("#finance").html('');
    if (you['cars'].length <= 0) {
        $("#finance").append('<center><h1>You have no cars</h1></center>');
    } else {
        $("#finance").append(`<center><small class='italic'>Your Cars</small></center>`);
    }

    for (let x in you['cars']) {
    let itemObj = you['cars'][x];
    $("#finance").append(`
        <center>
            <div class='item car-card'>
                <h3>${itemObj['name']}</h3>
                <p>Value: <span>$${comify(itemObj['cost'])}</span></p>
                <button class='button actionButton sellCar' id='${x}'>Sell Item</button>
            </div>
        </center>
    `);
}
    document.getElementById('finance').scrollTop = 0;
});

// Sell your car
$("#finance").on('click', ".sellCar", function() {
    let carThis = you['cars'][Number($(this).attr('id'))];
    $("#events").append(`<br><sh class='event'>I sold my car, ${carThis['name']}</sh>`);
    lessBig('Goodbye My Car!', `You sold your car`, 'linear-gradient(#659D32, #488214)');
    you['money'] += Math.floor(carThis['cost'] * 0.8);
    carThis['own'] = false;
    carThis['fixedUp'] = false;
    you['cars'].splice(Number($(this).attr('id')), 1);
    update();
    document.getElementById("events").scrollTop = document.getElementById("events").scrollHeight;
});

$("#careerButton").on('click', function() {
    if (you['dead']) return;
    $("#buttons").hide();
    $(".bottom-options").hide();
    $(".age-button-container").hide();
    $("#stats").hide();
    $("#leaveButton").show();
    $("#careers").show().html('');
    $("#events").hide();

    if (you['career'] == 'none') {
        if (you['age'] >= 18) {
            // Colleges
            $("#careers").append(`<center><h3>Colleges</h3></center>`);
            for (let x in colleges) {
                $("#careers").append(`
                    <div class="optionCard collegeOption" id="college-${x}" tabindex="0">
                        <div class="optionTitle">${colleges[x]['title']}</div>
                        <div class="optionSub">Cost Yearly: <span class="optionMoney">$${comify(colleges[x]['yearly'])}</span></div>
                    </div>
                `);
            }
            // Careers
            $("#careers").append(`<center><h3>Careers</h3></center>`);
            for (let x in careers) {
                $("#careers").append(`
                    <div class="optionCard careerOption" id="career-${x}" tabindex="0">
                        <div class="optionTitle">${careers[x]['title']}</div>
                        <div class="optionSub">Pay: <span class="optionMoney">$${comify(careers[x]['salary'])}</span></div>
                    </div>
                `);
            }
        } else {
            // SCHOOL-AGE UI (fill in as you wish)
            $("#careers").append(`<center id="schoolAndStuff"></center>`);
            if (you['age'] <= 5) {
                $("#schoolAndStuff").append(`<h1>You are too young for a job</h1>`);
            } else {
                // SCHOOLING TYPE
                let schooling = '';
                if (you['age'] > 5 && you['age'] < 12) schooling = 'elementary school';
                else if (you['age'] >= 12 && you['age'] < 14) schooling = 'middle school';
                else if (you['age'] >= 14) schooling = 'high school';

                // POPULARITY AVERAGE
                let popos = you['school']['classmates'].map(cm => cm['relation']);
                let avg = popos.length ? Math.floor(popos.reduce((a,b) => a + b, 0) / popos.length) : 0;
                you['school']['popularity'] = avg;

                // SCHOOL OVERVIEW
                $("#schoolAndStuff").append(`
                    <h2 class='school'>School: ${you['school']['name']}</h2>
                    <div>
                        Your Popularity
                        <div class='healthBar'><div class='healthMiddle' style='width: ${you['school']['popularity']}px'></div></div>
                    </div>
                    <br>
                    <div>
                        Your Grades
                        <div class='healthBar'><div class='healthMiddle' style='width: ${you['school']['grade']}px'></div></div>
                    </div>
                    <br>
                    <button class='button actionButton' id='tryHard'>Try Harder</button>
                    <br>
                    <button class='button actionButton' id='homework'>Do Homework</button>
                    <br>
                    <h2>Your Teachers</h2>
                    <div id='yourTeachers'></div>
                    <h2>Your Classmates</h2>
                    <div id='yourClassmates'></div>
                    <h2>Cliques</h2>
                    <div id='schoolCliques'></div>
                `);

                // Teachers
                for (let x in you['school']['teachers']) {
                    let teacher = you['school']['teachers'][x];
                    $("#yourTeachers").append(`
                        <div class='teacher' id='${x}'>
                            <h4 class='teachName'>${teacher['full_name']}</h4>
                            <small>${teacher['status']}</small>
                            <div>
                                Relation
                                <div class='healthBar'><div class='healthMiddle' style='width: ${teacher['relation']}px'></div></div>
                            </div>
                        </div>
                    `);
                }

                // Classmates
                for (let x in you['school']['classmates']) {
                    let kid = you['school']['classmates'][x];
                    $("#yourClassmates").append(`
                        <div class='student' id='${x}'>
                            <h4 class='teachName'>${kid['full_name']}</h4>
                            <small>${kid['status']}</small>
                            <div>
                                Relation
                                <div class='healthBar'><div class='healthMiddle' style='width: ${kid['relation']}px'></div></div>
                            </div>
                        </div>
                    `);
                }

                // Cliques
                for (let x in cliques) {
                    let clique = cliques[x];
                    if (clique['members'].length > 0) {
                        $("#schoolCliques").append(`
                            <div class='clique' id='${x}'>
                                <h4 class='teachName'>${clique['name']}</h4>
                                <small>Members: <span style='font-weight:bolder;color:red'>${clique['members'].length}</span></small>
                                <div>
                                    Popularity
                                    <div class='healthBar'><div class='healthMiddle' style='width:${clique['popularityReq']}px'></div></div>
                                </div>
                            </div>
                        `);
                    }
                }
            }
        }
    } else {
        // Already have a career
        $("#careers").append(`
            <center>
                <h1>You are a ${you['career']}!</h1>
                <br>
                <button class='button actionButton quit' id='jobQuit'>Quit being a ${you['career']}</button>
                <div id='interActive'></div>
            </center>
        `);
        if (you['career'] == 'college student') {
            // College-specific classmates/teachers
            $("#interActive").append(`
                <h2>Your Professors</h2>
                <div id='teachers'></div>
                <h2>Your Co-Students</h2>
                <div id='classmates'></div>
            `);

            // Professors
            for (let x in you['school']['teachers']) {
                let teacher = you['school']['teachers'][x];
                $("#teachers").append(`
                    <div class='teacher' id='${x}'>
                        <h3 class='teachName'>${teacher['full_name']}</h3>
                        <small>${teacher['status']}</small>
                        <div>
                            Relation
                            <div class='healthBar'><div class='healthMiddle' style='width:${teacher['relation']}px'></div></div>
                        </div>
                    </div>
                `);
            }
            // College classmates
            for (let x in you['school']['classmates']) {
                let student = you['school']['classmates'][x];
                $("#classmates").append(`
                    <div class='student' id='${x}'>
                        <h3 class='teachName'>${student['full_name']}</h3>
                        <small>${student['status']}</small>
                        <div>
                            Relation
                            <div class='healthBar'><div class='healthMiddle' style='width:${student['relation']}px'></div></div>
                        </div>
                    </div>
                `);
            }
        }
    }
});

// Handler: Choose a college
$("#careers").on('click', '.collegeOption', function() {
    let idx = $(this).attr('id').replace('college-', '');
    let collegeNow = colleges[idx];
    if (you['collegePoints'] == 0) {
        if (you['smarts'] > collegeNow['smartsReq']) {
            you['career'] = 'college student';
            you['term'] = collegeNow['years'];
            you['payYear'] = collegeNow['yearly'];
            you['pointsCollege'] = collegeNow['points'];
            lessBig('College!', `You were accepted to college`, 'linear-gradient(#f8d568, #FF9900)');
            $('#events').append(`<br><p class='event'>I am now going to college.</p>`);
            newSchoolPeople(6, 30, 'College');
        } else {
            $('#events').append(`<br><p class='event'>I am not smart enough to go to this college.</p>`);
            leave();
        }
    } else {
        $('#events').append(`<br><p class='event'>I have already been to college</p>`);
        leave();
    }
    update();
    var objDiv = document.getElementById("events");
    objDiv.scrollTop = objDiv.scrollHeight;
});

// Handler: Choose a career
$("#careers").on('click', '.careerOption', function() {
    let idx = $(this).attr('id').replace('career-', '');
    let careerNow = careers[idx];
    if (you['age'] >= 18) {
        if (you['career'] == 'none') {
            if (you['health'] >= careerNow['healthReq']) {
                if (you['happy'] >= careerNow['happyReq']) {
                    if (you['looks'] >= careerNow['looksReq']) {
                        if (you['smarts'] >= careerNow['smartsReq']) {
                            if (you['prisonYears'] <= careerNow['prisonYears']) {
                                if (careerNow['schoolReq'] == 0) {
                                    $('#events').append(`<br><p class='event'>I am now a ${careerNow['title']}!</p>`);
                                    lessBig('Job!', `You are now a ${careerNow['title']}`, 'linear-gradient(#f8d568, #FF9900)');
                                    you['salary'] += careerNow['salary'];
                                    you['career'] = careerNow['title'];
                                    you['jobSal'] = careerNow['salary'];
                                    you['job'] = careerNow;
                                    you['spot'] = Number(idx);
                                } else if (you['collegePoints'] == careerNow['schoolReq']) {
                                    $('#events').append(`<br><p class='event'>I am now a ${careerNow['title']}!</p>`);
                                    lessBig('Job!', `You are now a ${careerNow['title']}`, 'linear-gradient(#f8d568, #FF9900)');
                                    you['salary'] += careerNow['salary'];
                                    you['career'] = careerNow['title'];
                                    you['jobSal'] = careerNow['salary'];
                                    you['job'] = careerNow;
                                    you['spot'] = Number(idx);
                                } else {
                                    $('#events').append(`<br><p class='event'>I need to go to college to be a ${careerNow['title']}!</p>`);
                                    leave();
                                }
                            } else {
                                $('#events').append(`<br><p class='event'>I have been to prison too much to be a ${careerNow['title']}!</p>`);
                                leave();
                            }
                        } else {
                            $('#events').append(`<br><p class='event'>I am not smart enough to be a ${careerNow['title']}!</p>`);
                            leave();
                        }
                    } else {
                        $('#events').append(`<br><p class='event'>I am too ugly to be a ${careerNow['title']}!</p>`);
                        leave();
                    }
                } else {
                    $('#events').append(`<br><p class='event'>I am not happy enough to be a ${careerNow['title']}!</p>`);
                    leave();
                }
            } else {
                $('#events').append(`<br><p class='event'>I am not healthy enough to be a ${careerNow['title']}!</p>`);
                leave();
            }
        } else {
            $('#events').append(`<br><p class='event'>I already have a job.</p>`);
            leave();
        }
    } else {
        $('#events').append(`<br><p class='event'>I am not old enough to be a ${careerNow['title']}!</p>`);
        leave();
    }
    update();
    var objDiv = document.getElementById("events");
    objDiv.scrollTop = objDiv.scrollHeight;
});

// Handler: Quit job/college
$("#careers").on('click', '#jobQuit', function() {
    if (you['career'] != 'college student') {
        let jobQuitting = careers[you['spot']];
        you['salary'] -= jobQuitting['salary'];
        $('#events').append(`<br><p class='event'>I am no longer a ${jobQuitting['title']}!</p>`);
    } else {
        $('#events').append(`<br><p class='event'>I am no longer in college!</p>`);
    }
    you['career'] = 'none';
    leave();
    update();
    var objDiv = document.getElementById("events");
    objDiv.scrollTop = objDiv.scrollHeight;
});

// Handler: Click a classmate
$("#careers").on('click', '.student', function() {
    // Your detailed student modal logic here!
    // Example: openStudentModal(you['school']['classmates'][Number($(this).attr('id'))]);
    // You can also directly inject content into #careers as you did before.
    // Add your code here.
});

// Handler: Click a teacher
$("#careers").on('click', '.teacher', function() {
    // Your detailed teacher modal logic here!
    // Example: openTeacherModal(you['school']['teachers'][Number($(this).attr('id'))]);
    // Add your code here.
});

// Handler: Click a clique
$("#careers").on('click', '.clique', function() {
    // Your clique details logic here!
    // Example: openCliqueModal(cliques[Number($(this).attr('id'))]);
    // Add your code here.
});

// Handler: Try Harder (school)
$("#careers").on('click', '#tryHard', function() {
    $('#events').append(`<br><p class='event'>I studied harder at ${you['school']['name']}!</p>`);
    you['smarts'] += randrange(4);
    you['school']['grade'] += randrange(5);
    leave();
    update();
});

// Handler: Do Homework (school)
$("#careers").on('click', '#homework', function() {
    $('#events').append(`<br><p class='event'>I did some homework!</p>`);
    you['smarts'] += randrange(3);
    you['school']['grade'] += randrange(7);
    leave();
    update();
});

    
  $("#activitiesButton").on('click',function(){
      if (you['dead']) return;
      $("#buttons").hide();
      $(".bottom-options").hide();
      $(".age-button-container").hide();
      $("#stats").hide();
      $("#leaveButton").show();
      $("#activities").show();
      $("#activities").html('');
      $("#events").hide();
        $("#activities").append(`
  <div class="activity-section love">
    <h2>❤️ Love</h2>
    <div id='love'></div>
  </div>
  <div class="activity-section assets">
    <h2>💼 For Assets</h2>
    <div id='assets'></div>
  </div>
  <div class="activity-section social">
    <h2>👥 Social</h2>
    <div id='social'></div>
  </div>
  <div class="activity-section fame">
    <h2>🎭 Fame</h2>
    <div id='fame'></div>
  </div>
  <div class="activity-section health">
    <h2>🧠 Health and Mind</h2>
    <div id='healthAndMind'></div>
  </div>
  <div class="activity-section risk">
    <h2>💸 No Risk No Reward</h2>
    <div id='riskMoney'></div>
  </div>
  <div class="activity-section crime">
    <h2>🚔 Crimes</h2>
    <div id='crime'></div>
  </div>
  <div class="activity-section fun">
    <h2>🎮 For Fun</h2>
    <div id='forFun'></div>
  </div>
`);

      $("#riskMoney").append(`
          <button class='button gamble exp' id='lottery'>Play the lottery<br>Cost: $5</button>
          <br><br>
          <button class='button gamble exp' id='lottery10'>Buy 10 lottery tickets<br>Cost: $50</button>
          <br>
      `)
      $("#assets").append(`
          <button class='button friend' id='driverLicense'>Get a Drivers License</button>
          <br>
      `)
      $("#social").append(`
          <button class='button friend' id='friend'>Make a friend</button>
          <br>
      `)
      $("#forFun").append(`
          <button class='button actionButton' id='videogame'>Play A Video Game</button>
          <br>
      `)
      $("#love").append(`
          <button class='button date' id='date'>Meet someone to Date</button>
          <br><br>
          <button class='button date' id='hookup'>Random Hookup</button>
      `)
      $("#fame").append(`
          <button class='button fame' id='book'>Write A Book<br><small>Cost: <span style='color:green;'>2,000$</span></small></button><br><br>
          <button class='button fame' id='actingGig'>Find an Acting Gig<br><br></button><br><br>
          <button class='button fame' id='song'>Record A Song<br><small>Studio Session: <span style='color:green;'>500$</span></small></button>
      `)
      $("#crime").append(`
          <button class='button crime' id='jayWalk'>Jay Walk</button>
          <br><br>
          <button class='button crime' id='robber'>Rob Someone</button>
          <br><br>
          <button class='button crime' id='assault'>Assault Someone</button>
          <br><br>
          <button class='button crime' id='murder'>Murder Someone</button>
          <br><br>
          <button class='button crime' id='arson'>Commit Arson</button>
          <br><br>
          <button class='button crime' id='mailBall'>Play Mailbox Baseball</button>
          <br><br>
          <button class='button crime' id='porchPirate'>Commit Porch Pirate</button>
          <br><br>
          <div class='drugs'>
          <h2>Drugs</h2>
          <button class='button drug exp' id='cigar'>Smoke a Pack of Cigarrettes<br>Cost: $7</button>
          <br><br>
          <button class='button drug exp' id='vape'>Vape<br>Cost: $10</button>
          <br><br>
          <button class='button drug exp' id='smokePot'>Smoke Pot<br>Cost: $20</button>
          <br><br>
          <button class='button drug exp' id='smokeMeth'>Smoke Meth<br>Cost: $50</button>
          <br><br>
          <button class='button drug exp' id='snortCoke'>Snort Cocaine<br>Cost: $100</button>
          <br><br>
          <button class='button drug exp' id='shootHeroin'>Shoot Heroin<br>Cost: $100</button>
          <br><br>
          <button class='button drug exp' id='lsd'>Take LSD<br>Cost: $200</button>
          <br><br>
          <button class='button drug exp' id='pcp'>Take PCP<br>Cost: $200</button>
          </div>
      `)

      for (x in activities[0]) {
          let activity = activities[0][x];
              if (activity && activity.title) {
                $("#healthAndMind").append(`
              <button id='${x}' class='button activity exp'>${activity.title}<br><small style='color:green'>Cost: $${comify(activity.moneyReq || 0)}</small></button><br><br>
    `);
  }
}


      
      $("#videogame").on('click',function(){
          if (you['age'] < 3){
            $("#activities").html('<h1>You are too young to play video games</h1>')
          }
          else{
              $("#activities").html(`
                <center><small class='italic'>Video Games</small>
                <br>
                <button id='fortnite' class='button actionButton'>Play Fortnite</button>
                <br>
                <button id='gta5' class='button actionButton'>Play GTA5</button></center>
              `)
          }

          $("#fortnite").on('click',function(){
                $('#events').append(`<br><p class='event'>I played Fortnite</p>`);
                you['happy']+=randrange(5);
                you['smarts']-=randrange(3);
                leave()
                update();
          })
          $("#gta5").on('click',function(){
            $('#events').append(`<br><p class='event'>I played GTA5</p>`);
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
                      $('#events').append(`<br><p class='event'>I got my drivers license!!</p>`);
                      you['driversLicense']=true;
                      lessBig('License!!',`You have a drivers license!`,'linear-gradient(orange, pink)')
                  }
                  else{
                      $('#events').append(`<br><p class='event'>I failed my drivers test</p>`);
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><p class='event'>I already have a drivers license!!</p>`);
                  leave()
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to get a drivers license</p>`);
              leave()
          }
          update()
          
      })
  
      $("#lottery10").on('click',function(){
          if (you['money'] >= 50){
              you['money']-=50;
              $('#events').append(`<br><p class='event'>I bought ten lottery tickets <span style='color:red;'>-$50</span>!</p>`);
              if (randrange(105)==1){
                  $('#events').append(`<br><p class='event'>I won the lottery!!</p>`);
                  wonAmount = randrange(11000000);
                  $('#events').append(`<br><p class='event'>I won <span style='color:green;'>$${comify(wonAmount)}</span> dollars!</p>`);
                  you['money']+=wonAmount;
                  lessBig('Money!!',`You won the lottery!`,'linear-gradient(orange, pink)')
              }
              else{
                  $('#events').append(`<br><p class='event'>I did not win the lottery</p>`);
                  leave();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I can't afford ten lottery tickets</p>`);
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
                  $('#events').append(`<br><p class='event'>I was a ${position} playing ${charName} in a movie called "${movName}"!</p>`);
                  $('#events').append(`<br><p class='event'>I made <span style='color:green'>$${comify(money)}</span>!</p>`);
              }
              else{
                  $('#events').append(`<br><p class='event'>I could not get an acting gig!</p>`);
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to get an acting gig!</p>`);
          }
          leave();
          update();
      })
  
      $("#lottery").on('click',function(){
          if (you['money'] >= 5){
              you['money']-=5;
              $('#events').append(`<br><p class='event'>I bought a lottery ticket <span style='color:red;'>-$5</span>!</p>`);
              if (randrange(450)==1){
                  $('#events').append(`<br><p class='event'>I won the lottery!!</p>`);
                  wonAmount = randrange(11000000);
                  $('#events').append(`<br><p class='event'>I won <span style='color:green;'>$${comify(wonAmount)}</span> dollars!</p>`);
                  you['money']+=wonAmount;
                  lessBig('Money!!',`You won the lottery!`,'linear-gradient(orange, pink)')
              }
              else{
                  $('#events').append(`<br><p class='event'>I did not win the lottery</p>`);
                  leave();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I can't afford a lottery ticket</p>`);
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
              $('#events').append(`<br><p class='event'>I hooked up with a ${flingObj['age']} year old named ${flingObj['full_name']}</p>`);
              you['happy']+=randrange(10);
              if (randrange(3)==1){
                  for(x in you['relationships']){
                      let curr = you['relationships'][x];
                      if (curr['status']=='boyfriend'||curr['status']=='girlfriend'||curr['status']=='fiance'||curr['status']=='wife'||curr['status']=='husband'){
                          curr['relation']-=randrange(50);
                          $('#events').append(`<br><p class='event'>My ${curr['status']}, ${curr['full_name']}, found out I cheated on them!</p>`);
                          you['happy']-=randrange(10);
                      }
                  }
              }
              if (randrange(5)==1){
                  std = choice(stds)
                  you['diseases'].push(std);
                  $('#events').append(`<br><p class='event'>I contracted ${std['name']}</p>`);
                  you['happy']-=randrange(10);
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to hookup with someone</p>`);
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
                  $('#events').append(`<br><p class='event'>I recorded a song titled "${song}"</p>`);
                  you['fame']+=randrange(3);
                  let succession = randrange(you['fame']+you['smarts']+you['comedy']);
                  if (randrange(150)==1){
                      $('#events').append(`<br><p class='event'>My song "${song}" was a hit!</p>`);
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
                  $('#events').append(`<br><p class='event'>I need more money to fund my studio session song.</p>`);
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to record a song.</p>`);
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
                      $('#events').append(`<br><p class='event'>I wrote a book titled "${book}"</p>`);
                      you['fame']+=randrange(5);
                      let succession = randrange(you['fame']+you['smarts']+you['comedy']);
                      if (randrange(100)==1){
                          $('#events').append(`<br><p class='event'>My book "${book}" was a hit!</p>`);
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
                      $('#events').append(`<br><p class='event'>I need more money to fund my book.</p>`);
                  }
              }
              else{
                  $('#events').append(`<br><p class='event'>I already wrote a book this year.</p>`);
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to write a book.</p>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#smokePot").on('click',function(){
          if (you['age']>=18){
            if (you['money'] >= 20){
              $('#events').append(`<br><p class='event'>I smoked pot!</p>`);
              you['happy']+=randrange(6)
              you['smarts']-=randrange(3)
              am = randrange(6)
              you['stoned']+=am
              totalStoned += am;
              if (you['health']<0){you['health']=0}
              if (you['happy']>100){you['happy']=100}
              if (you['smarts']<0){you['smarts']=0}
              if (randrange(20)==1){
                  $('#events').append(`<br><p class='event'>I was caught!</p>`);
                  sentence = randrange(3);
                  prisShuf();
                  $('#events').append(`<br><p class='event'>I am going to prison for ${sentence} year/s!</p>`);
                  you['inPrison']=true;
                  if (you['career']!='none'){
                      you['salary']-=you['jobSal']
                  }
                  you['career']='none';
                  $("#prisonButtons").show();
                  $("#buttons").hide();
                  $("#activities").hide();
                  $("#events").show();
                  $("#leaveButton").hide();
              }
              else{
                  leave()
              }
            }
            else{
              $('#events').append(`<br><p class='event'>I don't have enough money to buy weed!</p>`);
              leave();
            }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to do drugs!</p>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#vape").on('click',function(){
          if (you['age']>=13){
            if (you['money'] >= 10){
                $('#events').append(`<br><p class='event'>I vaped, it costed $10!</p>`);
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
                            $('#events').append(`<br><p class='event'>I am addicted to Vaping again!</p>`);
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
                            $('#events').append(`<br><p class='event'>I am addicted to Vaping!</p>`);
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
                    $('#events').append(`<br><p class='event'>I was caught!</p>`);
                    if (you['age']<21){
                      $('#events').append(`<br><p class='event'>My vape was taken away.</p>`);
                      you['happy']-=5
                      leave();
                    }
                }
                else{
                    leave()
                }
            }
            else{
              $('#events').append(`<br><p class='event'>I did not have enough money to vape.</p>`);
              leave();
            }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to vape!</p>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#cigar").on('click',function(){
          if (you['age']>=13){
            if (you['money'] >= 7){
                $('#events').append(`<br><p class='event'>I smoked a pack of cigarrettes, it costed $7 dollars.</p>`);
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
                            $('#events').append(`<br><p class='event'>I am addicted to Cigarrettes again!</p>`);
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
                            $('#events').append(`<br><p class='event'>I am addicted to Cigarrettes!</p>`);
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
                    $('#events').append(`<br><p class='event'>I was caught!</p>`);
                    if (you['age']<21){
                      $('#events').append(`<br><p class='event'>My Cigarrettes were taken away.</p>`);
                      you['happy']-=5
                    }
                }
                else{
                    leave()
                }
                leave();
            }
            else{
              $('#events').append(`<br><p class='event'>I did not have enough money to buy Cigarrettes.</p>`);
              leave();
            }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to smoke cigarrettes!</p>`);
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
                  $('#events').append(`<br><p class='event'>I snorted cocaine! <span style='color:red;'>-$100</span></p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to cocaine again!</p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to cocaine!</p>`);
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
                      $('#events').append(`<br><p class='event'>I was caught!</p>`);
                      sentence = randrange(3);
                      $('#events').append(`<br><p class='event'>I am going to prison for ${sentence} year/s!</p>`);
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
                      $("#leaveButton").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><p class='event'>I don't have money to buy cocaine!</p>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><p class='event'>I am too young to do drugs!</p>`);
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
                  $('#events').append(`<br><p class='event'>I took LSD! <span style='color:red;'>-$200</span></p>`);
                  $('#events').append(`<br><p class='event'>I woke up ${choice(effects)}!</p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to LSD again!</p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to LSD!</p>`);
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
                      $('#events').append(`<br><p class='event'>I was caught!</p>`);
                      sentence = randrange(5);
                      $('#events').append(`<br><p class='event'>I am going to prison for ${sentence} year/s!</p>`);
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
                      $("#leaveButton").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><p class='event'>I don't have money to buy LSD!</p>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><p class='event'>I am too young to do drugs!</p>`);
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
                  $('#events').append(`<br><p class='event'>I took PCP! <span style='color:red;'>-$200</span></p>`);
                  $('#events').append(`<br><p class='event'>I woke up ${choice(effects)}!</p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to PCP again!</p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to PCP!</p>`);
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
                      $('#events').append(`<br><p class='event'>I was caught!</p>`);
                      sentence = randrange(5);
                      $('#events').append(`<br><p class='event'>I am going to prison for ${sentence} year/s!</p>`);
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
                      $("#leaveButton").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><p class='event'>I don't have money to buy PCP!</p>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><p class='event'>I am too young to do drugs!</p>`);
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
                  $('#events').append(`<br><p class='event'>I shot heroin! <span style='color:red;'>-$100</span></p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to heroin again!</p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to heroin!</p>`);
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
                      $('#events').append(`<br><p class='event'>I was caught!</p>`);
                      sentence = randrange(3);
                      $('#events').append(`<br><p class='event'>I am going to prison for ${sentence} year/s!</p>`);
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
                      $("#leaveButton").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><p class='event'>I don't have money to buy heroin!</p>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><p class='event'>I am too young to do drugs!</p>`);
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
                  $('#events').append(`<br><p class='event'>I smoked meth! <span style='color:red;'>-$50</span></p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to crystal meth again!</p>`);
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
                          $('#events').append(`<br><p class='event'>I am addicted to crystal meth!</p>`);
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
                      $('#events').append(`<br><p class='event'>I was caught!</p>`);
                      sentence = randrange(10);
                      $('#events').append(`<br><p class='event'>I am going to prison for ${sentence} year/s!</p>`);
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
                      $("#leaveButton").hide();
                  }
                  else{
                      leave()
                  }
              }
              else{
                  $('#events').append(`<br><p class='event'>I don't have money to buy meth!</p>`);
                  leave()
              }
          }else{
              $('#events').append(`<br><p class='event'>I am too young to do drugs!</p>`);
              leave()
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#jayWalk").on('click',function(){
          if (you['age'] >= 5){
              caught = randrange(100);
              $('#events').append(`<br><p class='event'>I decided to jay walk!</p>`);
              if (randrange(20)==1){
                  $('#events').append(`<br><p class='event'>I was hit by a truck!</p>`);
                  you['health']-=randrange(20);
              }
              if (caught != 1){
                  leave();
              }
              else{
                  $('#events').append(`<br><p class='event'>The cops actually cared!</p>`);
                  let sentenceTime = randrange(2)
                  $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s!</p>`);
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
                  $("#leaveButton").hide();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to jay walk</p>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#arson").on('click',function(){
          if (you['age'] >= 10){
              caught = randrange(3);
              $('#events').append(`<br><p class='event'>I decided to burn down a ${choice(buildings)}!</p>`);
              deaths = 0;
              if (randrange(4)==1){
                deaths = randrange(16);
                $('#events').append(`<br><p class='event'>${deaths} people were killed!</p>`);
                you['happy']-=randrange(10);
                murders+=deaths;
              }
              if (caught != 1){
                  leave();
              }
              else{
                  $('#events').append(`<br><p class='event'>The cops came!</p>`);
                  let sentenceTime = randrange(20) + (10 * deaths);
                  $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s!</p>`);
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
                  $("#leaveButton").hide();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to commit arson</p>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#assault").on('click',function(){
          if (you['age'] >= 18){
              $('#events').append(`<br><p class='event'>I assaulted someone! I ${choice(attacks)} their ${choice(bodyParts)}</p>`);
              caught = randrange(6);
              if (caught != 1){
                  leave();
              }
              else{
                  $('#events').append(`<br><p class='event'>They called the cops!</p>`);
                  let sentenceTime = randrange(6)
                  $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s!</p>`);
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
                  $("#leaveButton").hide();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to assault someone</p>`);
              leave();
          }
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $("#mailBall").on('click',function(){
          if (you['age'] >= 7){
              $('#events').append(`<br><p class='event'>I went around smacking peoples mailboxes with a baseball bat.</p>`);
              caught = randrange(6);
              if (caught != 1){
                  leave();
              }
              else{
                  $('#events').append(`<br><p class='event'>The cops caught me!</p>`);
                  let sentenceTime = randrange(2)
                  $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s!</p>`);
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
                  $("#leaveButton").hide();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to play mailbox baseball someone</p>`);
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
              $('#events').append(`<br><p class='event'>I made a new friend named ${friendObj['full_name']}!</p>`);
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
              $('#events').append(`<br><p class='event'>I talked with someone named ${acquaintance['full_name']}!</p>`);
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
                  $('#events').append(`<br><p class='event'>I murdered a person named ${theirName}</p>`);
                  murders++;
                  leave();
              }
              else{
                  $('#events').append(`<br><p class='event'>I was caught murdering someone!</p>`);
                  murders++;
                  let sentenceTime = randrange(20)+40
                  $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s!</p>`);
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
                  $("#leaveButton").hide();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to kill someone</p>`);
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
                  $('#events').append(`<br><p class='event'>I stole <span style='color:green;font-weight:bolder;'>$${amount}</span> from someone</p>`);
                  leave();
              }
              else{
                  $('#events').append(`<br><p class='event'>I was caught robbing someone!</p>`);
                  let sentenceTime = randrange(7)
                  $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s!</p>`);
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
                  $("#leaveButton").hide();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to rob someone</p>`);
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
                  $('#events').append(`<br><p class='event'>I stole a <span style='color:green;font-weight:bolder;'>${choice(items)}</span> from someones mailbox, I collected <span style='color:green;font-weight:bolder;'>$${amount}</span> for the item</p>`);
                  leave();
              }
              else{
                  $('#events').append(`<br><p class='event'>I was caught commiting porch pirate someone!</p>`);
                  let sentenceTime = randrange(7)
                  $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s!</p>`);
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
                  $("#leaveButton").hide();
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to commit porch pirate</p>`);
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
                      $('#events').append(`<br><p class='event'>My new ${them['status']} is named ${them['full_name']}</p>`);
                      you['relationships'].push(them);
                      lovers++;
                  }
                  else{
                      $('#events').append(`<br><p class='event'>I was rejected by someone, they told me I was too ${choice(meanWords)} to date.</p>`);
                  }
              }
              else{
                  for (x in you['relationships']){
                      if (you['relationships'][x]['status']=='girlfriend'||you['relationships'][x]['status']=='boyfriend'||you['relationships'][x]['status']=='wife'||you['relationships'][x]['status']=='husband'||you['relationships'][x]['status']=='fiance'){
                          statNow = you['relationships'][x]['status']
                      }
                  }
                  $('#events').append(`<br><p class='event'>I thought about cheating on my ${statNow}</p>`);
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I am too young to date.</p>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  
      $(".activity").on('click',function(){
          let activity = activities[Number($(this).attr('id'))];
          if (you['health'] >= activity['healthReq']){
              if (you['age'] >= activity['ageReq']){
                  if (you['happy']>=activity['happyReq']){
                      if (you['money'] >= activity['moneyReq']){
                          if (you['looks']>=activity['looksReq']){
                              if (you['smarts']>=activity['smartsReq']){
                                  $('#events').append(`<br><p class='event'>${activity['text']}</p>`);
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
                                  $('#events').append(`<br><p class='event'>I was too dumb to do what I wanted</p>`);
                              }
                          }
                          else{
                              $('#events').append(`<br><p class='event'>I was too ugly to do what I wanted</p>`);
                          }
                      }
                      else{
                          $('#events').append(`<br><p class='event'>I was too poor to do what I wanted</p>`);
                      }
                  }
                  else{
                      $('#events').append(`<br><p class='event'>I was too depressed to do what I wanted</p>`);
                  }
              }
              else{
                  $('#events').append(`<br><p class='event'>I was too young to do what I wanted</p>`);
              }
          }
          else{
              $('#events').append(`<br><p class='event'>I was too unhealthy to do what I wanted</p>`);
          }
          leave();
          update();
          var objDiv = document.getElementById("events");
          objDiv.scrollTop = objDiv.scrollHeight;
      })
  })
  
  $("#relationshipsButton").on('click',function(){
      if (you['dead']) return;
      $(".bottom-options").hide();
      $(".age-button-container").hide();
      $("#stats").hide();
      $("#leaveButton").show();
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
              <div id='${x}' class='human relationship-card'>
                  <h3 class='inf'>${person['full_name']}</h3>
                  <small class='inf'>${person['status']}</small>
                  <p class='inf'>Relation</p>
                      <div class='healthBar'>
                          <div class='healthMiddle' style='width:${person['relation']}%'>
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
                  <div id='${x}div2' class='buttonGrid'>
                  <button id='${x}' class='button hang hangOut'>Hang Out With Them</button>
                  <button id='${x}' class='button hang argue'>Argue With Them</button>
                  <button id='${x}' class='button hang fight'>Fight them</button>
                  <button id='${x}' class='button hang compliment'>Compliment Them</button>
                  <button id='${x}' class='button hang payThem'>Give Them Money</button>
                  <button id='${x}' class='button hang doctorsThem'>Take them to the doctors</button>
                  <button id='${x}' class='button hang spreadRumor'>Spread a rumor about them</button>
                  <button id='${x}' class='button hang insult'>Insult Them</button>
                  <button id='${x}' class='button hang spendTime'>Spend Time With Them</button>
                  </div>
              `)
  
              if (rnHuman['age']>15 && you['age'] >= 10){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='hang murderThem'>Murder Them</button>
                  `)
              }
  
              if (rnHuman['status']=='son'||rnHuman['status']=='daughter'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang giveAd'>Give Advice</button>
                  `)
              }
              if (rnHuman['status']!='son'&&rnHuman['status']!='daughter'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang moneyAsk'>Ask for Money</button>
                  `)
              }
              if (rnHuman['blood'] != true && rnHuman['status'] != 'girlfriend' && rnHuman['status'] != 'boyfriend' && you['gender'] != rnHuman['gender']&&rnHuman['status'] != 'wife' && rnHuman['status'] != 'husband' && rnHuman['status'] != 'fiance' && you['age']>=18){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang hookWith'>Hook Up With Them</button>
                  `)
              }
              if (rnHuman['blood'] != true && rnHuman['status'] != 'girlfriend' && rnHuman['status'] != 'boyfriend' && you['gender'] != rnHuman['gender']&&rnHuman['status'] != 'wife'&&rnHuman['status'] != 'husband'&&rnHuman['status'] != 'fiance'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang askOut'>Ask them out</button>
                  `)
              }
              if(rnHuman['status'] == 'girlfriend'||rnHuman['status'] == 'boyfriend' || rnHuman['status']=='wife' || rnHuman['status']=='husband' || rnHuman['status'] == 'fiance'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang goOnDate'>Go on a date</button>
                      <button id='${x}' class='button hang haveChild'>Have a child</button>
                      <button id='${x}' class='button hang loveMake'>Make Love</button>
                  `)
              }
      
              if(rnHuman['status'] == 'girlfriend'||rnHuman['status'] == 'boyfriend'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang propose'>Propose To Them</button>
                  `)
              }
      
              if (rnHuman['status'] != 'father' && rnHuman['status'] != 'mother' && rnHuman['status'] != 'wife' && rnHuman['status']!='husband'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang disregard'>Disregard Them</button>
                  `)
              }
              if(rnHuman['status'] == 'girlfriend'||rnHuman['status'] == 'boyfriend'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang breakUp'>Break Up</button>
                  `)
              }
      
              if (rnHuman['status'] == 'wife'||rnHuman['status']=='husband'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang divorce'>Divorce</button>
                  `)
              }
      
              if(rnHuman['status'] == 'fiance'){
                  $(`#${x}div2`).append(`
                      <button id='${x}' class='button hang callOff'>Call Off Engagement</button>
                      <button id='${x}' class='button hang elope'>Elope Now</button>
                  `)
              }

              $(".spendTime").on('click',function(){
                who = you['relationships'][Number($(this).attr('id'))];
                  $("#relationships").html(`
                  <center>
                    <small class='italic'>What would you like to do with your ${who['status']}, ${who['full_name']}</small>
                    <br>
                    <button class='button actionButton' id='pingPong'>Play Ping Pong</button>
                    <br>
                    <button class='button actionButton' id='chess'>Play Chess</button>
                    <br>
                    <button class='button actionButton' id='robSomeone'>Rob Someone With them</button>
                    <br>
                    <button class='button actionButton' id='smokeWithThem'>Smoke pot with them</button>
                  </center
                  `)

                  $("#smokeWithThem").on('click',function(){
                      if (you['age'] > 13){
                          if (who['age']>13){
                            $("#events").append(`<br><p class='event'>I asked my ${who['status']}, ${who['full_name']} if they would like to smoke pot with me.</p>`)
                            if (who['relation']>40){
                                if (who['drugs']==1){
                                    if (who['money'] >= 20){
                                        $("#events").append(`<br><p class='event'>They said yes. We smoked pot together.</p>`)
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
                                            $("#events").append(`<br><p class='event'>They said yes. They told me they did not have enough money. So I pitched in <span style='color:green'>$20</span> to buy the weed.</p>`)
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
                                            $("#events").append(`<br><p class='event'>They wanted to smoke weed with me, but neither of us had the money to do so.</p>`)
                                        }
                                    }
                                }
                                else{
                                    $("#events").append(`<br><p class='event'>They said no. They told me that smoking pot was an unhealthy and bad habit.</p>`)
                                    who['relation']-=randrange(10)
                                }
                            }
                            else{
                                $("#events").append(`<br><p class='event'>They said no. They told me they don't feel comfortable enough with me.</p>`)
                            }
                          }
                          else{
                            $("#events").append(`<br><p class='event'>${who['status']}, ${who['full_name']} is too young to smoke pot.</p>`)
                          }
                      }
                      else{
                        $("#events").append(`<br><p class='event'>I am too young to smoke weed with my ${who['status']}, ${who['full_name']}.</p>`)
                      }
                      if (who['relation']>100){who['relation']=100}
                      if (who['relation']<0){who['relation']=0}
                      leave();
                      update();
                  })

                  $("#robSomeone").on('click',function(){
                      if (you['age'] > 6){
                          if (who['age']>6){
                            $("#events").append(`<br><p class='event'>I asked my ${who['status']}, ${who['full_name']} if they would help me rob someone.</p>`)
                        if (who['relation'] > randrange(50)){
                            if (who['bad']==1){
                                amount = randrange(500);
                                if (randrange(10)!=1){
                                    $("#events").append(`<br><p class='event'>They said yes. They watched to make sure nobody saw us and we robbed a person for <span style='color:green'>$${amount}</span>. We split the money 50/50</p>`)
                                    who['relation'] += randrange(15);
                                    you['money']+=Math.floor(amount/2)
                                    who['money']+=Math.floor(amount/2)
                                    you['happy']+=randrange(5);
                                    if (who['relation']>100){who['relation']=100}
                                    leave();
                                }
                                else{
                                    $("#events").append(`<br><p class='event'>They said yes. But sadly we were caught by the police while in the act of robbing the person!</p>`)
                                    sentence = randrange(10);
                                    $('#events').append(`<br><p class='event'>I am going to prison for ${sentence} year/s!</p>`);
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
                                    $("#leaveButton").hide();
                                }   
                                }
                                else{
                                    $("#events").append(`<br><p class='event'>They said that robbery is against their morals.</p>`)
                                    who['relation']-=randrange(10)
                                    leave();
                                }
                            }
                            else{
                                $("#events").append(`<br><p class='event'>My ${who['status']}, ${who['full_name']} did not want to rob someone with me.</p>`)
                                leave();
                            }
                          }
                          else{
                            $("#events").append(`<br><p class='event'>${who['status']}, ${who['full_name']} is too young to rob someone with me.</p>`)
                            leave();
                          }
                      }
                      else{
                        $("#events").append(`<br><p class='event'>I wanted to rob someone with my ${who['status']}, ${who['full_name']}, but I was too young.</p>`)
                        leave();
                      }
                      if (who['relation']>100){who['relation']=100}
                      if (who['relation']<0){who['relation']=0}
                      update();
                })

                  $("#pingPong").on('click',function(){
                      if (who['relation'] > randrange(50)){
                        $("#events").append(`<br><p class='event'>I played ping pong with my ${who['status']}, ${who['full_name']}.</p>`)
                        who['relation'] += randrange(5);
                        you['happy']+=randrange(5);
                        if (who['relation']>100){who['relation']=100}
                      }
                      else{
                        $("#events").append(`<br><p class='event'>My ${who['status']}, ${who['full_name']} said they would rather not play ping pong with me.</p>`)
                      }
                      leave();
                      update();
                  })
                  $("#chess").on('click',function(){
                    if (who['relation'] > randrange(50)){
                      $("#events").append(`<br><p class='event'>I played chess with my ${who['status']}, ${who['full_name']}.</p>`)
                      who['relation'] += randrange(5);
                      you['smarts']+=randrange(5);
                      if (who['relation']>100){who['relation']=100}
                    }
                    else{
                      $("#events").append(`<br><p class='event'>My ${who['status']}, ${who['full_name']} said they would rather not play chess with me.</p>`)
                    }
                    leave();
                    update();
                })
              })
  
              $(".spreadRumor").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (confirm(`Are you sure you want to spread a rumor about your, ${who['status']}, ${who['full_name']}?`)){
                    $("#events").append(`<br><p class='event'>I spread a rumor about my ${who['status']}, ${who['full_name']}. I told everyone that they ${choice(rumors)}</p>`)
                    who['relation']-=randrange(20);
                    if (randrange(5)==1){
                      $("#events").append(`<br><p class='event'>They fought me!</p>`)
                      for(let x = 0; x<=randrange(3); x++){
                        $("#events").append(`<br><p class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</p>`)
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
                    $("#events").append(`<br><p class='event'>I told my ${who['status']}, ${who['full_name']}, that they are ${choice(meanWords)}</p>`)
                    who['relation']-=randrange(10);
                    if (randrange(7)==1){
                      $("#events").append(`<br><p class='event'>They fought me!</p>`)
                      for(let x = 0; x<=randrange(3); x++){
                        $("#events").append(`<br><p class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</p>`)
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
                  $("#events").append(`<br><p class='event'>I attempted to murder my ${who['age']} year old ${who['status']}, ${who['full_name']}!</p>`)
                  if (who['health']>randrange(60) && randrange(3)==1){
                      $("#events").append(`<br><p class='event'>They started to beat me up!</p>`)
                      you['health']-=randrange(50);
                      if (you['health']<0){you['health']=0};
                      if (randrange(2)==1){
                          $("#events").append(`<br><p class='event'>They called the cops!</p>`)
                          let sentenceTime = randrange(30)+5
                          $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s for attempted murder!</p>`);
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
                          $("#leaveButton").hide();
                      }
                      else{
                          leave();
                      }
                  }
                  else{
                      $("#events").append(`<br><p class='event'>I killed my ${who['status']}, ${who['full_name']}!</p>`)
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
                          $("#events").append(`<br><p class='event'>The cops found out it was me!</p>`)
                          let sentenceTime = randrange(10)+40
                          $('#events').append(`<br><p class='event'>I am going to prison for ${sentenceTime} year/s for murder!</p>`);
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
                          $("#leaveButton").hide();
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
                      $("#events").append(`<br><p class='event'>I asked my ${who['status']}, ${who['full_name']}, to come to the doctors with me.</p>`)
                      you['money']-=100
                      if (who['relation']>randrange(60) || who['status']=='son' || who['status'] == 'daughter'){
                          $("#events").append(`<br><p class='event'>They let me take them to the doctors! <span style='color: red;'>-$100</span></p>`)
                          who['health']+=randrange(10);
                          if (who['health']>100){who['health']=100};
                          who['relation']+=randrange(10);
                          if (who['relation']>100){who['relation']=100}
                      }
                      else{
                          $("#events").append(`<br><p class='event'>They were insulted!</p>`)
                          who['relation']-=randrange(10);
                          if (who['relation']<0){who['relation']=0};
                      }
                  }else{
                      $("#events").append(`<br><p class='event'>I don't have the money to take ${who['full_name']} to the doctors.</p>`)
                  }
                  leave();
                  update();
              })
  
              $(".hookWith").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  if (who['relation']>randrange(80)){
                      if (randrange(3)==1){
                          $("#events").append(`<br><p class='event'>I hooked up with my ${who['status']}, ${who['full_name']}.</p>`)
                          lovers++;
                          who['relation']+=randrange(5);
                          you['happy']+=randrange(5);
                          if (randrange(5)==1){
                              let stdGiven = choice(stds);
                              $("#events").append(`<br><p class='event'>I contracted ${stdGiven['name']}!</p>`)
                              who['relation']-=randrange(20);
                              you['happy']-=randrange(10)
                              you['diseases'].push(stdGiven);
                          }
                          if (randrange(4)==1){
                              for(x in you['relationships']){
                                  whoNow = you['relationships'][x];
                                  if (whoNow['status']=='girlfriend'||whoNow['status']=='boyfriend'||whoNow['status']=='fiance'||whoNow['status']=='wife'||whoNow['status']=='husband'){
                                      $("#events").append(`<br><p class='event'>My ${whoNow['status']} found out!</p>`)
                                      whoNow['relation']-=randrange(30);
                                      you['happy']-=randrange(10);
                                  }
                              }
                          }
                      }
                      else{
                          $("#events").append(`<br><p class='event'>My ${who['status']}, ${who['full_name']}, did not want to hookup with me.</p>`)
                          who['relation']-=randrange(10);
                      }
                  }
                  else{
                      $("#events").append(`<br><p class='event'>My ${who['status']}, ${who['full_name']}, did not want to hookup with me.</p>`)
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
                  $("#events").append(`<br><p class='event'>I gave my ${who['status']}, ${who['full_name']}, <span style='color:green;'>$${comify(amountGive)}</span> dollars.</p>`)
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
  
              $('.loveMake').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><p class='event'>I made love to my ${who['status']}, ${who['full_name']}.</p>`)
                  if (randrange(2)==1){
                      $("#events").append(`<br><p class='event'>They did not enjoy it!</p>`)
                      who['relation']-=2;
                      if (who['relation']<0){who['relation']=0};
                  }
                  else{
                      $("#events").append(`<br><p class='event'>They enjoyed it!</p>`)
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
                  $("#events").append(`<br><p class='event'>I gave advice to my ${who['status']}, ${who['full_name']}.</p>`)
                  if (randrange(3)==1){
                      $("#events").append(`<br><p class='event'>They did not like my advice!</p>`)
                      who['smarts']-=2;
                      if (who['smarts']<0){who['smarts']=0};
                      who['relation']-=randrange(10);
                  }
                  else{
                      $("#events").append(`<br><p class='event'>They appreciated the advice!</p>`)
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
                  $("#events").append(`<br><p class='event'>I asked my ${who['status']}, ${who['full_name']}, to have a child with me</p>`)
                  if (who['relation'] > randrange(100)){
                      if (randrange(3)==1){
                          $("#events").append(`<br><p class='event'>They said yes!</p>`)
                          childGender = choice(genders);
                          if (childGender=='Male'){babyList = mNames;}
                          else{babyList=fNames};
                          childName = prompt(`Child Name, your child is a ${childGender}`,choice(babyList))
                          if (childName == ''){
                              childName=choice(babyList);
                              $("#events").append(`<br><p class='event'>Your ${who['status']} named the child ${childName}</p>`)
                          }
                          else{
                              $("#events").append(`<br><p class='event'>You named the child ${childName}</p>`);
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
                          $("#events").append(`<br><p class='event'>They said they aren't sure if its the right time</p>`)
                          who['relation']-=1;
                      }
                  }
                  else{
                      $("#events").append(`<br><p class='event'>They said you aren't close enough</p>`)
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
                    $("#events").append(`<br><p class='event'>I have divorced my ${who['status']}, ${who['full_name']}.</p>`)
                    who['relation']-=100;
                    who['happy']-=50;
                    if (who['happy']<0){who['happy']=0}
                    who['status']='ex';
                    if (you['money']>who['money']){
                        payThem = Math.floor(you['money']*0.1);
                        $("#events").append(`<br><p class='event'>I had to pay them <span style='color:red;'>$${comify(pay)}</span></p>`)
                        you['money']-=payThem
                    }else{
                        payMe = Math.floor(who['money']*0.1);
                        $("#events").append(`<br><p class='event'>They had to pay me <span style='color:green;'>$${comify(payMe)}</span></p>`)
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
                  $("#events").append(`<br><p class='event'>I am now married to ${who['full_name']}.</p>`)
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
                    $("#events").append(`<br><p class='event'>I called off the engagement with ${who['full_name']}.</p>`)
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
                  $("#events").append(`<br><p class='event'>I proposed to my ${who['status']}, ${who['full_name']}.</p>`)
                  if (who['relation']>randrange(40)+50){
                      if (randrange(3)==1){
                          who['status']='fiance';
                          who['relation']+=20
                          you['happy']+=randrange(20);
                          if (you['happy']>100){you['happy']=100};
                          if (who['relation']>100){who['relation']=100};
                          $("#events").append(`<br><p class='event'>${who['full_name']} is now my ${who['status']}</p>`);
                      }else{
                          $("#events").append(`<br><p class='event'>They said they didn't feel ready!</p>`)
                          who['relation']-=5;
                      }
                  }
                  else{
                      $("#events").append(`<br><p class='event'>They said that you aren't close enough!</p>`)
                      who['relation']-=5;
                  }
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $('.askOut').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><p class='event'>I asked out my ${who['status']}, ${who['full_name']}.</p>`)
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
                                  $("#events").append(`<br><p class='event'>They said yes, we are now dating</p>`)
                                  lovers++;
                                  if (who['gender']=='Male'){
                                      who['status']='boyfriend';
                                  }else{
                                      who['status']='girlfriend'
                                  }
                                  who['relation']+=10
                              }
                              else{
                                  $("#events").append(`<br><p class='event'>I suddenly realized that they are too old for me.</p>`)
                              }
                          }
                          else{
                              $("#events").append(`<br><p class='event'>Then realized I'm too young to date.</p>`)
                          }
                      }else{
                          $("#events").append(`<br><p class='event'>I suddenly realized I'm already in a relationship</p>`);
                      }
                  }else{
                      $("#events").append(`<br><p class='event'>They rejected me!</p>`)
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
                  $("#events").append(`<br><p class='event'>I went on a date with my ${who['status']}, ${who['full_name']}.</p>`)
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
                    $("#events").append(`<br><p class='event'>I cut out connections with my ${who['status']}, ${who['full_name']}.</p>`)
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
                    $("#events").append(`<br><p class='event'>I fought my ${who['status']}, ${who['full_name']}.</p>`)
                    who['relation']-=randrange(20);
                    for(let x = 0; x<=randrange(3); x++){
                        $("#events").append(`<br><p class='event'>I ${choice(attacks)} their ${choice(bodyParts)}!</p>`)
                    }
                    for(let x = 0; x<=randrange(3); x++){
                        $("#events").append(`<br><p class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</p>`)
                    }
                    if (randrange(3)==1){
                        $("#events").append(`<br><p class='event'>I won the fight!</p>`)
                        who['health']-=randrange(20);
                        if (who['health']<0){who['health']=0}; 
                    }else{
                        $("#events").append(`<br><p class='event'>They won the fight!</p>`)
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
                  $("#events").append(`<br><p class='event'>I complimented my ${who['status']}, ${who['full_name']}. I told them they are ${choice(compliments)}</p>`)
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
                  $("#events").append(`<br><p class='event'>I argued with my ${who['status']}, ${who['full_name']}. We argued about ${choice(argueAbout)}</p>`)
                  who['relation']-=5;
                  leave();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $(".breakUp").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $('#events').append(`<br><p class='event'>I broke up with ${who['full_name']}</p>`);
                  you['happy']-=5;
                  leave();
                  who['status']='ex';
                  who['relation']-=20;
              })
          
              $(".moneyAsk").on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><p class='event'>I asked my ${who['status']}, ${who['full_name']}, for money.</p>`)
                  who['relation']--;
                  if (who['relation'] > randrange(100)){
                      if (who['money'] > 0){
                          if (you['age']>13){
                              amount = randrange(Math.floor(who['money']/50))
                          you['money']+=amount;
                          who['money']-=amount;
                          $("#events").append(`<br><p class='event'>They said yes and gave me <span style='color: green; font-weight: bolder;'>$${amount}</span></p>`)
                          }else{
                              $("#events").append(`<br><p class='event'>They said I was too young.</p>`)
                              who['relation']--;
                          }
                      }
                      else{
                          $("#events").append(`<br><p class='event'>They told me they are broke.</p>`)
                      }
                  }else{
                      $("#events").append(`<br><p class='event'>They said we aren't close enough.</p>`)
                      who['relation']--;
                  }
                  leave();
                  update();
                  var objDiv = document.getElementById("events");
                  objDiv.scrollTop = objDiv.scrollHeight;
              })
          
              $('.hangOut').on('click',function(){
                  who = you['relationships'][Number($(this).attr('id'))];
                  $("#events").append(`<br><p class='event'>I hung out with my ${who['status']}, ${who['full_name']}. We ${choice(hungOutDo)}.</p>`)
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
  

  function prisonLeave(){
      $("#prisonButtons").show();
      $("#buttons").hide();
      $("#events").show();
      $("#relationships").hide();
      $("#leaveButton").hide();
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
      $("#leaveButton").hide();
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
        <button class='button actionButton' id='talkWith'>Talk to them</button>
        <br>
        <button class='button actionButton' id='attack'>Attack Them</button>
        <br>
        <button class='button actionButton' id='workForEm'>Help Them</button>
        <br>
        <button class='button actionButton' id='murderThem'>Murder Them</button>
        <br>
    </div>
  </center>
      `)
      if (inmate['status'] != 'friend'){
          $("#buttonsRn").append(`<button class='button actionButton' id='friendThem'>Befriend Them</button><br>`)
      }
        $("#friendThem").on('click',function(){
            $("#events").append(`<br><p class='event'>I asked my fellow inmate, ${inmate['full_name']}, if they want to keep in contact after our sentences.</p>`);
            if (randrange(11-(inmate['relation']/10))==1){
                $("#events").append(`<br><p class='event'>They told me they would love to.</p>`);
                you['happy']-=randrange(5);
                inmate['relation']+=randrange(10);
                inmate.job = 'none';
                inmate.status = 'friend';
                you['relationships'].push(inmate);
            }
            else{
                $("#events").append(`<br><p class='event'>They told me they would rather not.</p>`);
                inmate['relation']-=randrange(10);
            }
            if (inmate['relation'] < 0){inmate['relation']=0}
            if (inmate['relation'] > 100){inmate['relation']=100}
            prisonLeave();
            update();
        })
        $("#murderThem").on('click',function(){
            $("#events").append(`<br><p class='event'>I attempted to murder my fellow inmate, ${inmate['full_name']}.</p>`);
            inmate['relation'] -= randrange(20);
            if (inmate['relation'] < 0){inmate['relation']=0}
            if (randrange(2)==1){
              $("#events").append(`<br><p class='event'>I began to attack them and they attacked me first! They ${choice(attacks)} my ${choice(bodyParts)}</p>`);
              you['health']-=randrange(20);
            }
            else{
                $("#events").append(`<br><p class='event'>I successfully killed them!</p>`);
                murders++;
                prisonInmates.splice(thing, 1)
            }
            if (randrange(3)==1){
              more = randrange(25);
              sentence += more;
              $("#events").append(`<br><p class='event'>The guards found out this went down! My sentence has been extended ${more} year/s.</p>`);
            }
            prisonLeave();
            update();
          })
        $("#workForEm").on('click',function(){
            tasks = ['clean their feet','wash their sheets','clean their toilet']
            $("#events").append(`<br><p class='event'>I helped my fellow inmate, ${inmate['full_name']}, I helped them ${choice(tasks)}</p>`);
            inmate['relation'] += randrange(10);
            if (randrange(4)==1){
                $("#events").append(`<br><p class='event'>They told me I'm now their bitch.</p>`);
                you['happy']-=randrange(5);
            }
            if (randrange(6)==1 && inmate['relation'] < 10){
                $("#events").append(`<br><p class='event'>They told me that I am awful at everything and should die.</p>`);
                inmate['relation']-=randrange(20);
            }
            if (inmate['relation'] < 0){inmate['relation']=0}
            if (inmate['relation'] > 100){inmate['relation']=100}
            prisonLeave();
            update();
        })

      $("#attack").on('click',function(){
        $("#events").append(`<br><p class='event'>I attacked my inmate, ${inmate['full_name']}, I ${choice(attacks)} their ${choice(bodyParts)}</p>`);
        inmate['relation'] -= randrange(20);
        if (inmate['relation'] < 0){inmate['relation']=0}
        if (randrange(2)==1){
          $("#events").append(`<br><p class='event'>They attacked me! They ${choice(attacks)} my ${choice(bodyParts)}</p>`);
          you['health']-=randrange(10);
        }
        if (randrange(3)==1){
          more = randrange(5);
          sentence += more;
          $("#events").append(`<br><p class='event'>The guards found out! My prison sentence has been extended ${more} years.</p>`);
        }
        prisonLeave();
        update();
      })

      $("#talkWith").on('click',function(){
        if (inmate['relation'] < randrange(50)){
          $("#events").append(`<br><p class='event'>My inmate, ${inmate['full_name']}, laughed at me for talking to them!</p>`);
        }
        else{
          $("#events").append(`<br><p class='event'>Me and a fellow inmate, ${inmate['full_name']}, talked for a while.</p>`);
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
    if (you['dead']) return;
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
        $("#events").append(`<br><p class='event'>I got a haircut from my fellow inmate named ${choice(prisonInmates)['full_name']}.</p>`)
        if (randrange(3)==1){
            $("#events").append(`<br><p class='event'>The haircut was awful and they accidentally cut part of my head.</p>`)
            you['looks']-=randrange(3)
        }
        else{
            $("#events").append(`<br><p class='event'>The haircut was a good cut.</p>`)
            you['looks']+=randrange(3)
        }
        if (you['looks']>100){you['looks']=100}
        if (you['looks']<0){you['looks']=0}
        prisonLeave()
        update();
      })
    $("#escape").on('click',function(){
      $("#events").append(`<br><p class='event'>I attempted to escape prison!</p>`)
      if (randrange(50)==1){
        if (prisEsc == false){
          you['inPrison']=false;
          $("#events").append(`<br><p class='event'>I escaped prison!</p>`);
          $("#buttons").show();
          $("#prisonButtons").hide();
          $("#prisonLeave").hide();
          you['happy']+=randrange(20);
          leave();
        }
      }
      else{
        $("#events").append(`<br><p class='event'>I failed to escape</p>`)
        prisEsc = true;
        you['happy']-=randrange(5);
        prisonLeave();
      }
      update();
    })
    $("#visit").on('click',function(){
      $("#events").append(`<br><p class='event'>I requested for someone I know to visit me in prison!</p>`)
      if (randrange(2)==1){
        if (you['relationships'].length > 0){
          person = choice(you['relationships']);
          $("#events").append(`<br><p class='event'>My ${person['status']}, ${person['full_name']}, came to visit me.</p>`)
          person['relation'] += randrange(5);
          if (person['relation'] > 100){person['relation']=100}
          you['happy']+=randrange(5);
        }
        else{
          $("#events").append(`<br><p class='event'>Nobody came to visit me.</p>`)
          you['happy']-=randrange(5);
        }
      }
      else{
        $("#events").append(`<br><p class='event'>Nobody came to visit me</p>`)
        you['happy']-=randrange(5);
      }
      prisonLeave();
      update();
    })
    $("#workout").on('click',function(){
      if (you['age'] > 10){
        $("#events").append(`<br><p class='event'>I worked out in prison.</p>`)
        if (prisWork == false){
          you['health']+=randrange(10)
          prisWork = true;
        }
      }
      else{
        $("#events").append(`<br><p class='event'>I tried to workout, but I couldn't even pick up the weight seeing as it wasn't intended for ${you['age']} year olds.</p>`)
      }
      prisonLeave()
      update();
    })
    $("#readBook").on('click',function(){
        books = ['Of Mice In Men','The Hunger Games','Flowers For Algernon','Misery']
        $("#events").append(`<br><p class='event'>I read a book titled ${choice(books)}.</p>`)
        if (prisRead == false){
            you['smarts']+=randrange(5);
            you['happy']+=randrange(5);
            prisRead = true;
        }
        prisonLeave()
        update();
      })
    $("#cry").on('click',function(){
      $("#events").append(`<br><p class='event'>I cried in my prison cell.</p>`)
      if (prisCry == false){
        you['happy']+=randrange(5);
        prisCry = true;
      }
      if (randrange(5)==1){
        $("#events").append(`<br><p class='event'>Another prisoner caught me!</p>`)
        $("#events").append(`<br><p class='event'>The prisoner attacked me! They ${choice(attacks)} my ${choice(bodyParts)}</p>`)
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
  
  //Aging up Age
  $(".ageButton").on('click',function(){
    if (you['dead']) return;
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
                  $("#events").append(`<br><p class='event'>${you['relationships'][x]['full_name']} is no longer my friend!</p>`)
              }
          }
          if (you['relationships'][x]['status']=='acquaintance'){
              if (you['relationships'][x]['relation']>20){
                  you['relationships'][x]['status']='friend';
                  $("#events").append(`<br><p class='event'>${you['relationships'][x]['full_name']} is now my friend!</p>`)
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
                      $("#events").append(`<br><p class='event'>My ${you['relationships'][x]['status']}, ${you['relationships'][x]['full_name']}, broke up with me</p>`)
                      listOfEvents.push(['Heartbreak',`My ${person['status']}, ${person['full_name']} broke up with me!`,'linear-gradient(blue, darkblue)'])
                      you['relationships'][x]['status']='ex';
                      you['relationships'][x]['relation']-=20;
                      you['happy']-=10;
                  }
              }
          }
          you['relationships'][x]['age']++;
          if (you['relationships'][x]['age'] > randrange(40) + 80){
              $("#events").append(`<br><p class='event'>My ${you['relationships'][x]['status']} died of old age</p>`)
              person = you['relationships'][x];
              if (person['status'] == 'mother' || person['status']=='father'|| person['status']=='wife'|| person['status']=='husband'){
                  if (person['relation'] > randrange(80)){
                      if (person['money'] > 0){
                          inherit = randrange(person['money'])
                          $("#events").append(`<br><p class='event'>I inherited <span style='color:green'>$${comify(inherit)}</span></p>`);
                          you['money']+=inherit;
                      }
                  }
                  else{
                      $("#events").append(`<br><p class='event'>I did not inherit any of the money</p>`);
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
  //    console.log(eventList2);
      $("#events").append(`
          <br><br>
          <p class='ageSpot'>Age: <span class='age'>${you['age']}</span></p>
      `)
      if (you['inPrison']==false){
          if (randrange(10)==1){
              listOfEvents.push(choice(eventList2));
          }
      }
      for(let x = 0; x<randrange(4); x++){
          eventNow = choice(eventList);
          $("#events").append(`<br><p class='event'>${eventNow['text']}</p>`)
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
              $("#events").append(`<br><p class='event'>I was released from prison</p>`);
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
                      $("#events").append(`<br><p class='event'>My ${person['status']}, ${person['full_name']}, told me they hate me.</p>`);
                      person['relation']-=randrange(5)
                      you['happy']-=1;
                  }
              }
          }
          if (randrange(20)==1){
              if (you['inPrison']==false){
                  if (person['relation']<15){
                      you['fights']++;
                      $("#events").append(`<br><p class='event'>My ${person['status']}, ${person['full_name']}, fought me.</p>`);
                      person['relation']-=randrange(20)
                      if (person['relation']<0){person['relation']=0}
                      for(let x = 0; x<=randrange(3); x++){
                          $("#events").append(`<br><p class='event'>I ${choice(attacks)} their ${choice(bodyParts)}!</p>`)
                      }
                      for(let x = 0; x<=randrange(3); x++){
                          $("#events").append(`<br><p class='event'>They ${choice(attacks)} my ${choice(bodyParts)}!</p>`)
                      }
                      damage = 0
                      if (randrange(3)==1){
                          $("#events").append(`<br><p class='event'>I won the fight!</p>`)
                          person['health']-=randrange(20);
                          damage = randrange(5);
                          you['health']-=damage
                      }else{
                          $("#events").append(`<br><p class='event'>They won the fight!</p>`)
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
                      $("#events").append(`<br><p class='event'>My ${person['status']}, ${person['full_name']}, hung out with me.</p>`);
                      person['relation']+=randrange(5);
                      if (person['relation']>100){
                          person['relation']=100;
                      }
                      you['happy']+=randrange(5);
                  }
              }
          }
          if (randrange(150)==1){
              $("#events").append(`<br><p class='event'>My ${person['status']}, ${person['full_name']}, died of ${choice(deaths)}.</p>`);
              listOfEvents.push(['Death',`My ${person['status']}, ${person['full_name']} died!`,'linear-gradient(black, gray)'])
              you['happy']-=randrange(20);
              if (person['status'] == 'mother' || person['status']=='father'|| person['status']=='wife'|| person['status']=='husband'){
                  if (person['relation'] > randrange(80)){
                      if (person['money'] > 0){
                          inherit = randrange(person['money'])
                          $("#events").append(`<br><p class='event'>I inherited <span style='color:green'>$${comify(inherit)}</span></p>`);
                          you['money']+=inherit;
                      }
                  }
                  else{
                      $("#events").append(`<br><p class='event'>I did not inherit any of the money</p>`);
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
                      $("#events").append(`<br><p class='event'>My ${person['status']}, ${person['full_name']}, died of health related causes</p>`);
                      listOfEvents.push(['Death',`My ${person['status']}, ${person['full_name']} died!`,'linear-gradient(black, gray)'])
                      person = you['relationships'][x];
                      if (person['status'] == 'mother' || person['status']=='father'|| person['status']=='wife'|| person['status']=='husband'){
                          if (person['relation'] > randrange(80)){
                              if (person['money'] > 0){
                                  inherit = randrange(person['money'])
                                  $("#events").append(`<br><p class='event'>I inherited <span style='color:green'>$${comify(inherit)}</span></p>`);
                                  you['money']+=inherit;
                              }
                          }
                          else{
                              $("#events").append(`<br><p class='event'>I did not inherit any of the money</p>`);
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
              $("#events").append(`<br><p class='event'>I finished college</p>`);
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
              $("#events").append(`<br><p class='event'>My book "${you['books'][x]['title']}" earned me <span style='color:green'>$${comify(earned)}</span></p>`);
          }
      }
  
      for(x in you['songs']){
          let currentSong=you['songs'][x];
          if (randrange(4)==1){
              earned = randrange(currentSong['maxMoney']);
              currentSong['totalEarned']+=earned;
              you['money']+=earned;
              $("#events").append(`<br><p class='event'>My song "${currentSong['title']}" earned me <span style='color:green'>$${comify(earned)}</span></p>`);
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
          $("#events").append(`<br><p class='event'>I just got the ${disease['name']} disease!</p>`);
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
                  $("#events").append(`<br><p class='event'>My ${currentClassmate['status']}, ${currentClassmate['full_name']} died of ${choice(deaths)}!</p>`);
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
              $("#events").append(`<br><p class='event'>Its a miracle! I was cured from ${currentDisease['name']}</p>`);
              listOfEvents.push(['Cured!',`You no longer have ${currentDisease['name']}!`,'linear-gradient(#42C0FB, #4AC948)'])
              you['diseases'].splice(x, 1);
          }
      }
  
      for(x in you['diseases']){
          you['health']-=randrange(you['diseases'][x]['healthDown']);
          $("#events").append(`<br><p class='event'>I continue to suffer from ${you['diseases'][x]['name']}!</p>`);
      }
  
      you['money']+=Math.floor(you['salary'] - (you['salary'] * taxPay));
      for(x in you['items']){
          let itemNow = you['items'][x];
          you['health']+=itemNow['health'];
          you['happy']+=itemNow['happy'];
          you['money']-=you['items'][x]['yearly'];
          if (you['money']<0){
              $("#events").append(`<br><p class='event'>I had to sell my house, ${you['items'][x]['name']}</p>`);
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
                          $("#events").append(`<br><p class='event'>My classmate ${classmateRn['full_name']} told me they think I'm ${choice(compliments)}!</p>`);
                          you['happy']+=randrange(5);
                          classmateRn['relation']+=randrange(10);
                          if (classmateRn['relation']>100){classmateRn['relation']=100}
                      }
                      else if (classmateRn['relation']<randrange(20)){
                          $("#events").append(`<br><p class='event'>My classmate ${classmateRn['full_name']} told me they think I'm ${choice(meanWords)}!</p>`);
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
                      $("#events").append(`<br><p class='event'>My ${onRn['status']}, ${onRn['full_name']}, is in debt</p>`);
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
       //       console.log(careers);
          }
      }
      if (you['inPrison']==false){
          if (you['age']==6||you['age']==12||you['age']==14||you['age']==18){
              thingNow = 'none'
              if (you['age']==6){
                  thingNow = 'Elementary School'
                  listOfEvents.push(['Elementary School',`You just started elementary school!`,'linear-gradient(#66CD00, #397D02)'])
                  $("#events").append(`<br><p class='event'>I now am attending elementary school</p>`);
              }
              if (you['age']==12){
                  thingNow = 'Middle School'
                  listOfEvents.push(['Middle School',`You just started middle school!`,'linear-gradient(#66CD00, #397D02)'])
                  $("#events").append(`<br><p class='event'>I now am attending middle school</p>`);
              }
              if (you['age']==14){
                  thingNow = 'High School'
                  listOfEvents.push(['High School',`You just started high school!`,'linear-gradient(#66CD00, #397D02)'])
                  $("#events").append(`<br><p class='event'>I now am attending high school</p>`);
              }
              if (you['age']==18){
                  $("#events").append(`<br><p class='event'>I finished high school.</p>`);
                  listOfEvents.push(['Freedom!',`You are done with school!!`,'linear-gradient(#027CD0, #5CA9DE)'])
              }
              newSchoolPeople(3,30,thingNow)
          }
      }
      if (you['career'] != 'college student' && you['career'] != 'none'){
          if (you['job']['healthReq'] > you['health']+10 || you['job']['smartsReq'] > you['smarts']+5 || you['job']['looksReq'] > you['looks']+5){
              if (randrange(3)==1){
                  listOfEvents.push(['Fired!',`You just got fired from your job!`,'linear-gradient(#8B4513, #A0522D)'])
                  $("#events").append(`<br><p class='event'>I was fired from being a ${you['career']}.</p>`);
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
              $("#events").append(`<br><p class='event'>I fell back into my old habits and am addicted to ${you['oldAddictions'][x]['name']} again.</p>`);
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
                  $("#events").append(`<br><p class='event'>My ${currentRn['status']}, ${currentRn['full_name']}, is now a ${currentRn['career']['title']}</p>`);
              }
          }
      }
  
      for(x in you['relationships']){
          currentRn = you['relationships'][x];
          if (currentRn['career']!='none'){
              if (randrange(70)==1){
                  $("#events").append(`<br><p class='event'>My ${currentRn['status']}, ${currentRn['full_name']}, was fired from being a ${currentRn['career']['title']}</p>`);
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
              $("#events").append(`<br><p class='event'>I spent <span style='color:red'>$${costed}</span> on ${addiction['name']} this year.</p>`);
          }
          else{
              you['happy']-=randrange(10);
              you['health']-=randrange(3);
              if (you['inPrison'] == true){
                  $("#events").append(`<br><p class='event'>I could not get ${addiction['name']} this year because I'm in prison.</p>`);
              }
              else{
                  $("#events").append(`<br><p class='event'>I could not afford to buy ${addiction['name']} this year.</p>`);
              }
              $("#events").append(`<br><p class='event'>It is driving me insane.</p>`);
          }
      }
      for(x in you['payingOff']){
          let currentOne = you['payingOff'][x];
          you['money']-=Math.floor(currentOne['cost']/10);
          currentOne['years']--;
          if (currentOne['years'] == 0){
              $("#events").append(`<br><p class='event'>I finished paying off my ${currentOne['name']}</p>`);
              you['items'].push(currentOne);
              you['payingOff'].splice(x, 1)
          }
          if (you['money'] < 0){
              $("#events").append(`<br><p class='event'>I had to take out a bank loan for my ${currentOne['name']}</p>`);
          }
      }
      for (x in you['gems']){
          you['gems'][x]['shined']=false
      }
      for(x in activities){
          activities[x]['done']=false;
      }
     // console.log(listOfEvents)
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
    //  update();
      if (you['happy']<0){you['happy']=0};
      if (you['looks']<0){you['looks']=0};
      if (you['smarts']<0){you['smarts']=0};
      if (you['health']>100){you['health']=100};
      if (you['happy']>100){you['happy']=100};
      if (you['looks']>100){you['looks']=100};
      if (you['smarts']>100){you['smarts']=100};
     // console.log(you);
      var objDiv = document.getElementById("events");
      objDiv.scrollTop = objDiv.scrollHeight; 
        update();
        saveGame();
});
//}
