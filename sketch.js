var waitbg, bg, finale;
var done =false;
var gamestate = "wait"
var main, m1, m2, m3, m4, m5, b1, b2, b3, b4, b5, bs, ms
var ground;
var pdir=1,edir=-1,bdir=-1;
var tune="lightblue";
var allStats;
var enemyImg,enemydeath,enemyjump,enemyrrun,enemywalk,enemyattack1,enemyattack2,enemyattack3
var playerStats,enemyStats;
var bullet,logo,arrow,arrowImage;
var sound={
    gun:null,
    sword:null,
    grunt:null,
    end:null
}

var tornado;
var explosion;

var boss;
var bossImg,bossdeath,bossjump,bosshurt,bossrun,bosswalk,bossattack1,bossattack2,bossattack3,bossattack4,bossattack5
var bossStats;

var settings = {
    music: null,
    volume: null,
    vol: {
        volume: 0.5,
        buttons: {
            plus: null,
            minu: null,
        }
    }
}

var b_controls={
    up:null,
    left:null,
    right:null,
    gun:null,
    sword1:null,
    sword2:null,
}

function preload() {
    allStats=loadJSON("stats.json");

    waitbg = loadImage("./bg/02.jpg")
    playbgimg = loadImage("./bg/bg10.png")
    finale = loadImage("./bg/13.jpg")
    logo = loadImage("MERCANERY-OF-JUSTICE-unscreen.gif")

    m1 = loadSound("musics/stylish-rock-beat-trailer-116346.mp3")
    m2 = loadSound("musics/asian-cinematic-122770.mp3")
    m3 = loadSound("musics/one-croquette-riddim-127848.mp3")
    m4 = loadSound("musics/indian-music-with-sitar-tanpura-and-sarangi-74577.mp3")
    m5 = loadSound("musics/world-asian-carnival-china-traditional-music-travel-118593.mp3")


    playerImg=loadImage("agent hitman 01/default.gif")
    playerdeath=loadImage("agent hitman 01/death.gif")
    playerjump=loadImage("agent hitman 01/jump.gif")
    playerrun=loadImage("agent hitman 01/run.gif")
    playerhurt=loadImage("agent hitman 01/hurt.gif")
    playerattack1=loadImage("agent hitman 01/a1.gif")
    playerattack2=loadImage("agent hitman 01/a2.gif")
    playerattack3=loadImage("agent hitman 01/a3.gif")
    playerwalk=loadImage("agent hitman 01/walk.gif")

    enemyImg=loadImage("demon/default.gif")
    enemydeath=loadImage("demon/death.gif")
    enemyjump=loadImage("demon/jump.gif")
    enemyrrun=loadImage("demon/run.gif")
    enemywalk=loadImage("demon/walk.gif")
    enemyattack1=loadImage("demon/a1.gif")
    enemyattack2=loadImage("demon/a2.gif")
    enemyattack3=loadImage("demon/a3.gif")

    bossImg=loadImage("phsycic boss/default.gif")
    bosswalk=loadImage("phsycic boss/walk.gif")
    bossrun=loadImage("phsycic boss/run.gif")
    bossjump=loadImage("phsycic boss/jump.gif")
    bosshurt=loadImage("phsycic boss/hurt.gif")
    bossdeath=loadImage("phsycic boss/dead.gif")
    bossattack1=loadImage("phsycic boss/a3.gif")
    bossattack2=loadImage("phsycic boss/a4.gif")
    bossattack3=loadImage("phsycic boss/a5.gif")
    bossattack4=loadImage("phsycic boss/a4.gif")
    bossattack5=loadImage("phsycic boss/a5.gif")
    arrowImage=loadImage("phsycic boss/arrow.png")

    sound.end=loadSound("sounds/male_hurt7-48124.mp3")
    sound.gun=loadSound("sounds/9mm-pistol-shoot-short-reverb-7152.mp3")
    sound.sword=loadSound("sounds/sword-hit-7160.mp3")
    sound.grunt=loadSound("sounds/male_hurt7-48124.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight)

    playerStats=allStats.hitman;
    enemyStats=allStats.demon;
    bossStats=allStats.boss;

    logosprite=createSprite(width/2,height/2,width,height)
    logosprite.addImage(logo)
    logosprite.scale=2

    ground=createSprite(windowWidth/2,windowHeight-20,windowWidth*2,10)
    playbutton = createButton("play")
    playbutton.position(width / 2 - 200, 250)
    playbutton.class("customButton")
    playbutton.size(400, 50)

    settingbutton = createButton("settings")
    settingbutton.position(width / 2 - 200, 310)
    settingbutton.class("customButton")
    settingbutton.size(400, 50)

    settings.vol.buttons.plus = createButton("+")
    settings.vol.buttons.plus.position(width / 2 + 150, 100)
    settings.vol.buttons.plus.class("customButton")
    settings.vol.buttons.plus.size(50, 50)
    settings.vol.buttons.plus.hide()

    settings.vol.buttons.minu = createButton("-")
    settings.vol.buttons.minu.position(width / 2 - 200, 100)
    settings.vol.buttons.minu.class("customButton")
    settings.vol.buttons.minu.size(50, 50)
    settings.vol.buttons.minu.hide()

    settings.volume = createButton("volume")
    settings.volume.position(width / 2 - 150, 250)
    settings.volume.class("customButton")
    settings.volume.size(300, 50)
    settings.volume.hide()

    settings.music = createButton("music")
    settings.music.position(width / 2 - 150, 310)
    settings.music.class("customButton")
    settings.music.size(300, 50)
    settings.music.hide()

    b1 = createButton("music 1")
    b1.position(width / 2 - 325, 250)
    b1.class("customButton")
    b1.size(650, 50)
    b1.hide()

    b2 = createButton("music 2")
    b2.position(width / 2 - 325, 310)
    b2.class("customButton")
    b2.size(300, 50)
    b2.hide()

    b3 = createButton("music 3")
    b3.position(width / 2 + 25, 310)
    b3.class("customButton")
    b3.size(300, 50)
    b3.hide()

    b4 = createButton("music 4")
    b4.position(width / 2 - 325, 370)
    b4.class("customButton")
    b4.size(300, 50)
    b4.hide()

    b5 = createButton("music 5")
    b5.position(width / 2 + 25, 370)
    b5.class("customButton")
    b5.size(300, 50)
    b5.hide()

    // controls
    b_controls.up = createImg("./buttons/up-arrow.png")
    b_controls.up.position(125, 370)
    b_controls.up.class("arrow")
    b_controls.up.hide()

    b_controls.left = createImg("./buttons/left-arrow.png")
    b_controls.left.position(50, 435)
    b_controls.left.class("arrow")
    b_controls.left.hide()

    b_controls.right = createImg("./buttons/right-arrow.png")
    b_controls.right.position(200, 435)
    b_controls.right.class("arrow")
    b_controls.right.hide()

    b_controls.sword1 = createImg("./buttons/sword.png")
    b_controls.sword1.position(width-105, 420)
    b_controls.sword1.class("sword1")
    b_controls.sword1.hide()

    b_controls.sword2 = createImg("./buttons/sword.png")
    b_controls.sword2.position(width-280, 420)
    b_controls.sword2.class("sword2")
    b_controls.sword2.size(120,120)
    b_controls.sword2.hide()

    b_controls.gun = createImg("./buttons/gun.png")
    b_controls.gun.position(width-105, 300)
    b_controls.gun.class("gun")
    b_controls.gun.hide()

    // back
    backbutton = createImg("./buttons/back.png")
    backbutton.position(width / 30, 20)
    backbutton.size(50, 50)
    backbutton.hide()

    ms = [m1, m2, m3, m4, m5]
    bs = [b1, b2, b3, b4, b5]

    m1.loop()



    // player sprite

    player=createSprite(250,height-300)
    player.addImage("default",playerImg)
    player.addImage("dead",playerdeath)
    player.addImage("jump",playerjump)
    player.addImage("run",playerrun)
    player.addImage("hurt",playerhurt)
    player.addImage("walk",playerwalk)
    player.addImage("attack1",playerattack1)
    player.addImage("attack2",playerattack2)
    player.addImage("attack3",playerattack3)

    player.tint=tune
    player.scale=2.25
    player.visible=false

    // enemy sprite
    enemy=createSprite(width-250,height-350)
    enemy.addImage("default",enemyImg)
    enemy.addImage("dead",enemydeath)
    enemy.addImage("jump",enemyjump)
    enemy.addImage("run",enemyrrun)
    enemy.addImage("walk",enemywalk)
    enemy.addImage("attack1",enemyattack1)
    enemy.addImage("attack2",enemyattack2)
    enemy.addImage("attack3",enemyattack3)
    enemy.scale=2.25
    enemy.visible=false
    enemy.mirrorX(-1)
    enemy.tint=tune

    boss=createSprite(width-250,height-350);
    boss.addImage("default",bossImg);
    boss.addImage("dead",bossdeath)
    boss.addImage("jump",bossjump)
    boss.addImage("run",bossrun)
    boss.addImage("walk",bosswalk)
    boss.addImage("attack1",bossattack1)
    boss.addImage("attack2",bossattack2)
    boss.addImage("attack3",bossattack3)
    boss.addImage("attack4",bossattack1)
    boss.addImage("attack5",bossattack2)
    boss.addImage("attack6",bossattack3)
    boss.scale=2.25
    boss.visible=false
    boss.mirrorX(-1)

    ground.visible=false
    bulletGroup= new Group()
    arrowGroup= new Group()

}

function draw() {

    
    if (gamestate === "wait") {
        background(waitbg)
        enemy.visible=false
        player.visible=false
        logosprite.visible=true
        push()
        fill("#FFD700");
        stroke("#D1B000");
        strokeWeight(10);
        textFont("black birder");
        textSize(120);
        textAlign(CENTER, TOP);
        text("Mercenary of Justice", windowWidth/2,100);
        textSize(117.5);
        strokeWeight(0);
        fill("#FFE55C");
        textAlign(CENTER, TOP);
        text("Mercenary of Justice", windowWidth/2,100);
        pop()

        playbutton.show()
        settingbutton.show()
        backbutton.hide()
        settings.vol.buttons.plus.hide()
        settings.vol.buttons.minu.hide()
        b1.hide()
        b2.hide()
        b3.hide()
        b4.hide()
        b5.hide()
    }

    playbutton.mousePressed(() => {
        gamestate = "play"
        backbutton.hide()

    })
    //  start play
    if (gamestate === "play") {
        image(playbgimg,0,0,windowWidth,windowHeight)
        logosprite.visible=false

        player.velocityY+=3.7;
        enemy.velocityY+=3.7;
        player.setCollider("rectangle",-20*pdir,10,130,140)
        enemy.setCollider("rectangle",-20*edir,20,130,140)
        if(player.x<0){
            player.x=0
        }
        if(player.x>windowWidth){
            player.x=windowWidth
        }

        if(enemy.x<0){
            enemy.x=0
        }
        if(enemy.x>windowWidth){
            enemy.x=windowWidth
        }

        b_controls.up.show()
        b_controls.left.show()
        b_controls.right.show()
        b_controls.gun.show()
        b_controls.sword1.show()
        b_controls.sword2.show()
        playbutton.hide()
        settingbutton.hide()
        enemy.visible=true
        player.visible=true
        controls()
        bars(playerStats,enemyStats)
        if(done){
            image(finale,0,0,windowWidth,windowHeight)
        }
        if(playerStats.health<=0){
            playerStats.health=0;
            player.velocityX=0;
            enemy.velocityX=0;
            player.changeImage("dead")
            enemy.changeImage("default")
            enemy.y=windowWidth*2
            swal(
                {
                  title: `Game Over!!!`,
                  text: "You Lost Try Again!!",
                  image:"./agent hitman 01/death.gif",
                  imageSize: "150x150",
                  confirmButtonText: "Play Again"
                },
                function(isConfirm) {
                  if (isConfirm) {
                    location.reload();
                  }
                }
              );
            // location.reload()
        }
        if(enemyStats.health<=0){
            enemyStats.health=0;
            // enemy.velocityX=0;
            // player.velocityX=0;
            enemy.changeImage("dead")
            player.changeImage("default")
            bulletGroup.destroyEach()
            enemy.visible=false
            enemy.y=windowHeight+200
            enemy.destroy();
            // enemyStats=null;
            done=true
            boss.visible=true;
            player.velocityY+=3.7;
            bars(playerStats,bossStats)
            
            ai2();
            controls()
            
            
        }
        
       ai()
       
       
    // end of play

    
    if(settingbutton.mousePressed(()=>{
        gamestate="settingsmusic"
    })){} 



    
    if (gamestate === "settingsmusic") {
        background(waitbg)
        playbutton.hide()
        settingbutton.hide()
        settings.volume.hide()
        settings.music.hide()
        backbutton.show()
        settings.vol.buttons.plus.show()
        settings.vol.buttons.minu.show()
        b1.show()
        b2.show()
        b3.show()
        b4.show()
        b5.show()

        if (settings.vol.buttons.plus.mousePressed(() => {
            settings.vol.volume += 0.1
        })) { }
        if(settings.vol.volume>0){
            if (settings.vol.buttons.minu.mousePressed(() => {
                settings.vol.volume -= 0.1
            })) { }
        }
        if(settings.vol.volume<1){
            if(settings.vol.buttons.plus.mousePressed(()=>{
                settings.vol.volume+=0.1
            })){}
        }
        if(settings.vol.buttons.minu.mousePressed(()=>{
            settings.vol.volume-=0.1
        })){}
        rect(windowWidth/2-125,125,250,10)
        fill("blue")
        rect(windowWidth/2-125,125,250*settings.vol.volume,10)
        fill(255)
        ellipse(windowWidth/2-125+250*settings.vol.volume,130,20,20)

        // select music
        if(b1.mousePressed(()=>{
            if(m2.isPlaying() || m3.isPlaying() || m4.isPlaying() || m5.isPlaying()){
                if(m2.isPlaying()){
                    m2.stop()
                }
                else if(m3.isPlaying()){
                    m3.stop()
                }
                else if(m4.isPlaying()){
                    m4.stop()
                }
                else if(m5.isPlaying()){
                    m5.stop()
                }
            }
            if(!m1.isPlaying()){
                m1.loop()   
            }
        
        })){} 
        if(b2.mousePressed(()=>{
            if(m1.isPlaying() || m3.isPlaying() || m4.isPlaying() || m5.isPlaying()){
                if(m1.isPlaying()){
                    m1.stop()
                }
                else if(m3.isPlaying()){
                    m3.stop()
                }
                else if(m4.isPlaying()){
                    m4.stop()
                }
                else if(m5.isPlaying()){
                    m5.stop()
                }
            }
            if(!m2.isPlaying()){
                m2.loop()
            }
        })){}
         
        if(b3.mousePressed(()=>{
            if(m2.isPlaying() || m1.isPlaying() || m4.isPlaying() || m5.isPlaying()){
                if(m2.isPlaying()){
                    m2.stop()
                }
                else if(m1.isPlaying()){
                    m1.stop()
                }
                else if(m4.isPlaying()){
                    m4.stop()
                }
                else if(m5.isPlaying()){
                    m5.stop()
                }
            }
            if(!m3.isPlaying()){
                m3.loop()
            }
        })){} 

        if(b4.mousePressed(()=>{
            if(m2.isPlaying() || m3.isPlaying() || m1.isPlaying() || m5.isPlaying()){
                if(m2.isPlaying()){
                    m2.stop()
                }
                else if(m3.isPlaying()){
                    m3.stop()
                }
                else if(m1.isPlaying()){
                    m1.stop()
                }
                else if(m5.isPlaying()){
                    m5.stop()
                }
            }
            if(!m4.isPlaying()){
                m4.loop()
            }
        })){} 

        if(b5.mousePressed(()=>{
            if(m2.isPlaying() || m3.isPlaying() || m4.isPlaying() || m1.isPlaying()){
                if(m2.isPlaying()){
                    m2.stop()
                }
                else if(m3.isPlaying()){
                    m3.stop()
                }
                else if(m4.isPlaying()){
                    m4.stop()
                }
                else if(m1.isPlaying()){
                    m1.stop()
                }
            }
            if(!m5.isPlaying()){
                m5.loop()
            }
        })){} 


    }
    
    for(var i=0;i<5;i++){
        if(ms[i].isPlaying()){
            ms[i].setVolume(settings.vol.volume);
        }
    }
    if (backbutton.mousePressed(() => {
        gamestate = "wait"
        
    })) {
    }

    player.collide(ground)
    boss.collide(ground)
    enemy.collide(ground)

    player.mirrorX(pdir)
    
    sound.sword.setVolume(500)
    sound.grunt.setVolume(500)
    drawSprites()

}

function bars(playerStats,opponent){
    fill("lightgray")
    rect(100,20,250,20)
    rect(windowWidth-350,20,250,20)
    fill("lightgreen")
    rect(100,20,playerStats.health/4,20)
    rect(windowWidth-350,20,opponent.health/4.4,20)
}

function ai(){
    if(enemy.x<player.x){
        edir=1
    }
    if(enemy.x>player.x){
        edir=-1
    }
    // enemy.changeImage("run")

    setTimeout(()=>{
        if(player.velocityX===0){
            enemy.velocityX=0;
            enemy.changeImage("attack1")
            if(enemy.isTouching(player)){
                playerStats.health-=enemyStats.a1.damage
                sound.grunt.play()
            }
            setTimeout(()=>{
                enemy.changeImage("default")
            },1000)
        }
    },1000)

    setTimeout(()=>{
    
        enemy.velocityX=0;
        enemy.changeImage("attack1")
        
        if(enemy.isTouching(player)){
            playerStats.health-=enemyStats.a1.damage
            player.x-=pdir*100
        }
    
    },1000)

    setTimeout(()=>{
    
        enemy.velocityX=0;
        enemy.changeImage("attack2")
        if(enemy.isTouching(player)){
            playerStats.health-=enemyStats.a2.damage
            sound.grunt.play()
        }
    
    },2500)

    setTimeout(()=>{
    
        enemy.velocityX=0;
        enemy.changeImage("attack3")
        if(enemy.isTouching(player)){
            playerStats.health-=enemyStats.a3.damage
            sound.grunt.play()
        }
    },4000)


        enemy.velocityX=edir*enemyStats.speed
    
    enemy.mirrorX(edir)
    
}

function controls(){
    b_controls.up.mousePressed(()=>{
        player.velocityY-=37
        player.changeImage("jump")
        setTimeout(()=>{
            if(player.velocityX===0){
                player.changeImage("default")
            }
            else{
                player.changeImage("run")
            }
        },1000)
    })
    b_controls.left.mousePressed(()=>{
        player.velocityX=-7
        pdir=-1
        player.changeImage("run")
    })
    b_controls.right.mousePressed(()=>{
        player.velocityX=7
        pdir=1
        player.changeImage("run")
    })
    b_controls.sword1.mousePressed(()=>{
        player.velocityX=0
        player.changeImage("attack1")
        if(player.isTouching(enemy)){
            enemyStats.health-=playerStats.a1.damage
            sound.grunt.play()
            sound.sword.play()
            // sound.sword.setVolume(200)
            enemy.x-=pdir*150

        }
        else{
            enemy.changeImage("run")
        }
        setTimeout(()=>{
            player.changeImage("default")
        },1000)
    })
    b_controls.gun.mousePressed(()=>{
        player.velocityX=0
        player.changeImage("attack2")
        spawnbullets()
        sound.gun.play()

        // if(!player.isTouching(enemy)){
            for(i=0;i<bulletGroup.length;i++){
            if(enemy.isTouching(bulletGroup.get(i))){
                enemyStats.health-=playerStats.a2.damage
                sound.grunt.play()
                
                bulletGroup.get(i).destroy()
            }}
        setTimeout(()=>{
            player.changeImage("default")
        },1000)
    })


    
    b_controls.sword2.mousePressed(()=>{
        player.velocityX=0
        player.changeImage("attack3")
        if(player.isTouching(enemy)){
            enemyStats.health-=playerStats.a3.damage
            sound.grunt.play()
            sound.sword.play()
            enemy.x-=pdir*150
        }
        else{
            enemy.changeImage("run")
        }
        setTimeout(()=>{
            player.changeImage("default")
        },1000)
    })

}
}
function ai2(){
    if(boss.x<player.x){
        bdir=1
    }
    if(enemy.x>player.x){
        bdir=-1
    }
    if(boss.x<=0){
        boss.x=windowWidth-50
    }
    if(boss.x>=windowWidth){
        boss.x=50
    }
    setTimeout(()=>{
        var rand=Math.round(Math.random(1,3))
        switch(rand){
            case 1:
                boss.changeImage("attack1");
                bossStats.speed=14
                boss.y+=100
                if(boss.isTouching(player)){
                    playerStats.health-=bossStats.a3.damage
                    sound.grunt.play()
                }
                setTimeout(()=>{
                    boss.changeImage("default")
                    boss.y-=100
                },1000)
                break;
            case 2:
                boss.changeImage("attack2")
                boss.y+=150
                if(boss.isTouching(player)){
                    playerStats.health-=bossStats.a4.damage
                    sound.grunt.play()
                }
                setTimeout(()=>{
                    boss.changeImage("default")
                    boss.y-=150
                },1000)
                break;
            case 3:
                boss.changeImage("attack3");
                if(boss.isTouching(player)){
                    playerStats.health-=bossStats.a5.damage
                    sound.grunt.play()
                }
                boss.x=Math.random(0,windowWidth);
                boss.y=random(0,windowHeight-100)
                setTimeout(()=>{
                    boss.changeImage("default")
                },1000)
                break;
        }
    },1500)
    boss.velocityX=bdir*bossStats.speed
    
    boss.mirrorX(bdir)
}
function spawnbullets(boss){
    
    if(boss===true){
        arrow=createSprite(player.x+125*pdir,player.y-75,15,5)
        arrow.addImage(arrowImage)
        arrow.scale=0.2;
        arrow.tint="white"
        arrow.velocityX=pdir*70
        arrow.lifetime=20
        arrowGroup.add(arrow)
    }
    else{
        bullet=createSprite(player.x+125*pdir,player.y-75,15,5)
        bullet.shapeColor=rgb(175,175,50)
        bullet.tint="yellow"
        bullet.velocityX=pdir*50
        bullet.lifetime=100
        bulletGroup.add(bullet)
    }
}