document.addEventListener("DOMContentLoaded", function () {
  // --- Start Menu & About Modal Logic ---
  const startMenu = document.getElementById("startMenu");
  const game = document.getElementById("game"); // main game container
  const startButton = document.getElementById("startButton");
  const aboutButton = document.getElementById("aboutButton");
  const aboutModal = document.getElementById("aboutModal");
  const closeAbout = document.getElementById("closeAbout");
  const nameInput = document.getElementById("nameInput");

  // Only show start menu initially, hide main game
  if (game) game.style.display = "none";
  if (startMenu) startMenu.style.display = "";

  function startGame() {
    if (startMenu) startMenu.style.display = "none";
    if (game) game.style.display = "";
    // Set player name if input exists
    if (nameInput && document.querySelectorAll(".name").length > 0) {
      let playerName = nameInput.value.trim() || "Player";
      document.querySelectorAll(".name").forEach(span => span.textContent = playerName);
    }
    // Run the rest of the game logic
    if (typeof window.GameAppInit === "function") {
      window.GameAppInit();
    }
  }

  function showAbout() {
    if (aboutModal) aboutModal.style.display = "flex";
  }
  function hideAbout() {
    if (aboutModal) aboutModal.style.display = "none";
  }

  if (startButton) startButton.addEventListener("click", startGame);
  if (aboutButton) aboutButton.addEventListener("click", showAbout);
  if (closeAbout) closeAbout.addEventListener("click", hideAbout);
  if (aboutModal) {
    aboutModal.addEventListener("click", function (e) {
      if (e.target === aboutModal) hideAbout();
    });
  }

  // --- VibeLife Game Logic ---
  // All original jQuery and game logic is now run only after Start Game is pressed!
  window.GameAppInit = function () {
  // LocalStorage initialization
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

    let mNames = ['Randy ','Tom ','Hank ','Bill ','George ','Leo ','Fred ','Jeff ','Steve ','Riley ','Carl ','Braden ','Clark ','Liam ','Colten ','Peter ','Ned ','Ethan ','William ','Mason ','Gavin '];
    let fNames = ['Tina ','Stacy ','Linda ','Zelly ','Lia ','Cindy ','Terisha ','Jane ','Sarah ','Julia ','Clay ','Sally ','Lillie ','Ana ','Maya ','Scarlett ','Christine ','Emily ','Eva ','Ava ','Maria'];
    let lNames = ['Harrison','Lanson','Davidson','Williams','Johnson','Smith','Wilson','Brown','Davis','Miller','Mohammed','Rodriguez','Sampson','Newman','Derren','Rowan','Garfield','Parker','Gavia','Swanson'];
    let genders = ['Male','Female'];
    let pastPeople = [];

    choice = max => { return max[Math.floor(Math.random()*max.length)]; }

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
       randrange = max => Math.floor(Math.random()*max);
    function comify(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let traits = [
        {
            name:'Skinny',
            healthYear: 0,
            looksYear: 0,
            comedyYear: 0
        }
    ];

    let activities = [
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
        // ... (rest of activities array, continue in next chunk)
    ];

    for(x in activities){
        activities[x]['done']=false
    }

    let careers = [
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
       let houses = [
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
        // ... (more house objects) ...
    ];

    let colleges = [
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
        // ... (other colleges) ...
    ];
      let events = {
        "baby": [
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
            // ... more baby events ...
        ],
        "child": [
            {
                "text":'I stubbed my toe while walking.',
                "health":0,
                "happy":-1,
                "smarts":0,
                "looks":0,
                "money":0,
                'comedy':0
            },
            // ... more child events ...
        ],
        // ... teen, adult, prison, etc ...
    };
     // Player object initialization

    let you = {
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
    else{you['first_name']=choice(fNames);}
    you['last_name']=choice(lNames);
    you['full_name']=`${you['first_name']} ${you['last_name']}`;

    $(".name").html(you['full_name']);

    // ... (Continue player initialization, family, relatives, diseases, etc)
    // Example: Family initialization
    let family = [
        {
            relation: "Mother",
            first_name: choice(fNames),
            last_name: you['last_name'],
            age: randrange(18) + 20,
            health: randrange(80) + 20,
            happy: randrange(100),
            smarts: randrange(100),
            looks: randrange(100),
            relationScore: randrange(100) + 1,
            alive: true
        },
        {
            relation: "Father",
            first_name: choice(mNames),
            last_name: you['last_name'],
            age: randrange(18) + 20,
            health: randrange(80) + 20,
            happy: randrange(100),
            smarts: randrange(100),
            looks: randrange(100),
            relationScore: randrange(100) + 1,
            alive: true
        }
    ];
    // Optionally, siblings or more relatives can be added here

    // UI updates
    function updateStats() {
        $("#age").text(you.age);
        $("#health").text(you.health);
        $("#happy").text(you.happy);
        $("#smarts").text(you.smarts);
        $("#looks").text(you.looks);
        $("#money").text(comify(you.money));
        $("#career").text(you.career);
        $("#fame").text(you.fame);
        $("#comedy").text(you.comedy);
    }

    // Example: Next year event
    $("#nextYearButton").on("click", function () {
        if (you.dead) return;
        you.age += 1;
        // Generate random event for age group
        let ageGroup = you.age < 5 ? "baby"
                    : you.age < 13 ? "child"
                    : you.age < 18 ? "teen"
                    : "adult";
        let evList = events[ageGroup];
        if (evList && evList.length > 0) {
            let ev = choice(evList);
            you.health += ev.health; you.happy += ev.happy;
            you.smarts += ev.smarts; you.looks += ev.looks;
            you.money += ev.money; you.comedy += ev.comedy;
            $("#eventLog").prepend(`<div>${ev.text}</div>`);
        }
        // Age-related checks
        if (you.health <= 0 || you.happy <= 0) {
            you.dead = true;
            $("#eventLog").prepend(`<div>You have died at age ${you.age}.</div>`);
        }
        updateStats();
    });

    // Initial draw
    updateStats();
    // Example: Actions (work, study, relationships, crime, etc.)
    $("#workButton").on("click", function () {
        if (you.career === 'none') {
            $("#eventLog").prepend(`<div>You do not have a job. Try applying for one!</div>`);
            return;
        }
        let earned = Math.floor((you.salary || 0) / 12);
        you.money += earned;
        you.happy += 1;
        you.health -= 1;
        $("#eventLog").prepend(`<div>You worked as a ${you.career} and earned $${comify(earned)} this month.</div>`);
        updateStats();
    });

    $("#studyButton").on("click", function () {
        if (you.collegePoints > 0) {
            you.smarts += randrange(3) + 1;
            you.happy -= 1;
            you.collegePoints -= 1;
            $("#eventLog").prepend(`<div>You studied hard and your smarts increased.</div>`);
        } else {
            $("#eventLog").prepend(`<div>You are not enrolled in school or out of study points.</div>`);
        }
        updateStats();
    });

    $("#relationshipButton").on("click", function () {
        you.happy += 3;
        $("#eventLog").prepend(`<div>You spent time with loved ones. Happiness increased.</div>`);
        updateStats();
    });

    $("#crimeButton").on("click", function () {
        let success = randrange(100) < 20 ? false : true;
        if (success) {
            let loot = randrange(5000) + 500;
            you.money += loot;
            $("#eventLog").prepend(`<div>You committed a crime and got away with $${comify(loot)}!</div>`);
        } else {
            you.inPrison = true;
            you.prisonYears = randrange(5) + 1;
            $("#eventLog").prepend(`<div>You got caught committing a crime and are sent to prison for ${you.prisonYears} years!</div>`);
        }
        updateStats();
    });

    // Death handling
    function die(reason) {
        you.dead = true;
        $("#eventLog").prepend(`<div>You have died at age ${you.age}. Reason: ${reason}</div>`);
        save({
            name: you.full_name,
            age: you.age,
            money: you.money,
            career: you.career,
            cause: reason
        });
        updateStats();
        // Optionally show restart menu or summary here
    }

    // Example: Random death check per year
    function randomDeathCheck() {
        if (you.health <= 0) die("Health depleted");
        if (you.happy <= 0) die("Happiness depleted");
        if (you.age > 110 && randrange(100) < 20) die("Old age");
    }

    // Ensure randomDeathCheck is called in your yearly progression logic!
    // Example: Buying a house
    $("#buyHouseButton").on("click", function () {
        // Show available houses to buy (simplified)
        let available = houses.filter(h => !h.own && you.money >= h.cost);
        if (available.length === 0) {
            $("#eventLog").prepend(`<div>You cannot afford any house right now.</div>`);
            return;
        }
        // For demonstration, buy first affordable house
        let house = available[0];
        house.own = true;
        you.money -= house.cost;
        you.happy += 5;
        $("#eventLog").prepend(`<div>You bought a house: ${house.name} for $${comify(house.cost)}.</div>`);
        updateStats();
    });

    // Example: Applying for a job
    $("#applyJobButton").on("click", function () {
        // Show jobs you qualify for (simplified)
        let available = careers.filter(job =>
            you.health >= (job.healthReq || 0) &&
            you.happy >= (job.happyReq || 0) &&
            you.smarts >= (job.smartsReq || 0) &&
            you.looks >= (job.looksReq || 0)
        );
        if (available.length === 0) {
            $("#eventLog").prepend(`<div>You do not qualify for any jobs right now.</div>`);
            return;
        }
        // For demonstration, take first available job
        let job = available[0];
        you.career = job.title;
        you.salary = job.salary;
        $("#eventLog").prepend(`<div>You got a new job as a ${job.title} earning $${comify(job.salary)} per year.</div>`);
        updateStats();
    });

    // Example: Going to college
    $("#goCollegeButton").on("click", function () {
        let available = colleges.filter(col =>
            you.smarts >= (col.smartsReq || 0)
        );
        if (available.length === 0) {
            $("#eventLog").prepend(`<div>You do not qualify for any colleges right now.</div>`);
            return;
        }
        let college = available[0];
        if (you.money < college.yearly * college.years) {
            $("#eventLog").prepend(`<div>You cannot afford ${college.title}.</div>`);
            return;
        }
        you.money -= college.yearly * college.years;
        you.collegePoints += college.points;
        $("#eventLog").prepend(`<div>You attended ${college.title} for ${college.years} years.</div>`);
        updateStats();
    });

    // Optionally: Add restart/new life button
    $("#restartButton").on("click", function () {
        location.reload(); // Simple full reload for this demo
    });
        // ==== VibeLife Actual Game Logic, Part 9 (Final) ====

    // End of your main game logic and all event bindings here.

    // Close the GameAppInit function
    };

    // Close the DOMContentLoaded wrapper
    });

    // ==== END OF FILE ====
