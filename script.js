// ==============================
// HTML ELEMENTS
// ==============================

const scanner = document.getElementById("scanner");

const popup = document.getElementById("scan-popup");
const popupContent = document.getElementById("popup-content");
const closePopup = document.getElementById("close-popup");

const successPopup = document.getElementById("success-popup");
const continueButton = document.getElementById("continue-button");

const gateImage = document.getElementById("gate-image");
const welcomePenguin = document.getElementById("welcome-penguin");

const welcomeDialogue = document.getElementById("welcome-dialogue");
const readyButton = document.getElementById("ready-button");

const mapScreen = document.getElementById("map-screen");
const mapDialogue = document.getElementById("map-dialogue");
const mapDialogues = [
    "Image/Map1.png",
    "Image/Map2.png",
    "Image/Map3.png",
    "Image/Map4.png",
    "Image/Map5.png",
    "Image/Map6.png",
    "Image/Map7.png",
    "Image/Map8.png"
];

const spoiledIcon = document.getElementById("spoiled-icon");
const spoiledLand = document.getElementById("spoiled-land");
const spoiledPenguin = document.querySelector(".spoiled-penguin");
const spoiledIntro = document.getElementById("spoiled-intro");

const spoiledThrone = document.querySelector(".spoiled-throne");
const spoiledPlayground = document.querySelector(".spoiled-playground");
const spoiledRest = document.querySelector(".spoiled-rest");
const spoiledShop = document.querySelector(".spoiled-shop");
const spoiledChaos = document.querySelector(".spoiled-chaos");
const spoiledWantHotspot = document.querySelector(".spoiled-want-hotspot");
const spoiledIntroImages = [
    "Image/任性企鵝intro1.png",
    "Image/任性企鵝intro2.png",
    "Image/任性企鵝intro3.png",
    "Image/任性企鵝intro4.png",
    "Image/任性企鵝intro5.png",
    "Image/任性企鵝intro6.png",
    "Image/任性企鵝intro7.png",
    "Image/任性企鵝intro8.png",
    "Image/任性企鵝intro9.png",
    "Image/任性企鵝intro10.png"
];

const ghostIcon = document.getElementById("ghost-icon");
const ghostLand = document.getElementById("ghost-land");

const saveIndicator = document.getElementById("save-indicator");

const ghostDialogues = [
    document.querySelector(".ghost-dialogue-1"),
    document.querySelector(".ghost-dialogue-2"),
    document.querySelector(".ghost-dialogue-3"),
    document.querySelector(".ghost-dialogue-4"),
    document.querySelector(".ghost-dialogue-5")
];

const ghostReturnMap = document.querySelector(".ghost-return-map");
const ghostLeaving1 = document.querySelector(".ghost-leaving-1");
let ghostFirstVisitFinished =
    localStorage.getItem("ghostFirstVisitFinished") === "true";

let ghostTrustUnlocked =
    localStorage.getItem("ghostTrustUnlocked") === "true";

let ghostDialogueIndex = 0;

function showSaveIndicator() {
    saveIndicator.classList.add("show");

    setTimeout(function () {
        saveIndicator.classList.remove("show");
    }, 1800);

    checkCouncilUnlock();
}

let spoiledIntroIndex = 0;
let spoiledIntroFinished =
    localStorage.getItem("spoiledIntroFinished") === "true";

let mapDialogueIndex = 0;

const welcomeDialogues = [
    "Image/welcoming - 1.png",
    "Image/welcoming - 2.png",
    "Image/welcoming - 3.png",
    "Image/welcoming - 4.png"
];

let welcomeDialogueIndex = 0;

// ==========================
// MAP WELCOME PENGUIN RESET
// ==========================

const mapWelcomePenguinHotspot =
    document.getElementById("map-welcome-penguin-hotspot");

const restartMenu =
    document.getElementById("restart-menu");

const restartPanel1 =
    document.querySelector(".restart-panel-1");

const restartPanel2 =
    document.querySelector(".restart-panel-2");

const restartPanel3 =
    document.querySelector(".restart-panel-3");

// =========================
welcomeDialogue.addEventListener("click", function () {
    welcomeDialogueIndex++;

    if (welcomeDialogueIndex < welcomeDialogues.length) {
        welcomeDialogue.src = welcomeDialogues[welcomeDialogueIndex];
    } else {
        // 對話講完
        welcomeDialogue.classList.add("hidden-dialogue");

        // 等對話框淡出，再顯示「我準備好啦！」
        setTimeout(function () {
            readyButton.classList.remove("hidden-ready");
        }, 400);
    }
});

// ==============================
// PRELOAD 開門圖片
// ==============================

const openGateImage = new Image();

openGateImage.src =
    "Image/企鵝世界_-_大門（開）.png";


// ==============================
// 撳綠色 Scanner
// ==============================

scanner.addEventListener("click", function () {

    scanner.classList.add("scanned");

    showStartScreen();

    popup.classList.remove("hidden");
});


// ==============================
// 關閉 Scanner Popup
// ==============================

closePopup.addEventListener("click", function () {

    popup.classList.add("hidden");

});


// ==============================
// 第一頁：SPECIAL ACCESS CHECK
// ==============================

function showStartScreen() {

    popupContent.innerHTML = `

        <h2>
            SPECIAL ACCESS CHECK
        </h2>

        <div class="penguin-row">

            <span class="star">☆</span>

            <img
                src="Image/標誌_1.png"
                class="check-penguin"
                alt="Penguin"
            >

            <span class="star">☆</span>

        </div>

        <p class="detected-text">
            偵測到企鵝世界特別通行證。
        </p>

        <div class="divider"></div>

        <p class="instruction-text">

            請將你的 Special Pass
            <br>
            放置於掃描器上。

        </p>

        <button
            id="scan-button"
            class="scan-button">

            ✦ SCAN PASS ✦

        </button>

        <button
            id="cancel-button"
            class="cancel-button">

            取消

        </button>

    `;


    const scanButton =
        document.getElementById("scan-button");

    const cancelButton =
        document.getElementById("cancel-button");


    scanButton.addEventListener(
        "click",
        startScanning
    );


    cancelButton.addEventListener(
        "click",
        function () {

            popup.classList.add("hidden");

        }
    );

}


// ==============================
// 第二頁：驗證中
// ==============================

function startScanning() {

    popupContent.innerHTML = `

        <h2>
            SPECIAL ACCESS CHECK
        </h2>

        <div class="penguin-row">

            <span class="star">☆</span>

            <img
                src="Image/標誌_1.png"
                class="check-penguin"
                alt="Penguin"
            >

            <span class="star">☆</span>

        </div>

        <div class="scanning-title">
            驗證中⋯⋯
        </div>

        <div class="loading-dots">

            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>

        </div>

        <p class="wait-text">
            請稍候⋯⋯
        </p>

    `;


    setTimeout(
        showSuccess,
        1500
    );

}


// ==============================
// 第三頁：驗證成功
// ==============================

function showSuccess() {

    popup.classList.add("hidden");

    successPopup.classList.remove("hidden");

}


// ==============================
// 撳「繼續」→ 開門
// ==============================

continueButton.addEventListener(
    "click",
    function () {

        // 關閉成功視窗
        successPopup.classList.add("hidden");


        // Scanner 正式失效
        scanner.style.pointerEvents = "none";


        // 關門圖淡出
        gateImage.classList.add("fade-out");


        setTimeout(
            function () {

                // 換成開門圖片
                gateImage.src =
                    "Image/企鵝世界_-_大門（開）.png";


                // 開門圖淡入
                gateImage.classList.remove("fade-out");


                // 0.7 秒後迎接企鵝出現
                setTimeout(
    function () {

        // 迎接企鵝出現
        welcomePenguin.classList.remove(
            "hidden-penguin"
        );

        // 再等 0.8 秒，顯示第一句對話
        setTimeout(function () {

            welcomeDialogue.classList.remove(
                "hidden-dialogue"
            );

        }, 800);

    },
    700
);

            },
            600
        );

    }
);
// =========================
// ENTER PENGUIN WORLD MAP
// =========================

readyButton.addEventListener("click", function () {

    // 播放 Penguin World Beginning BGM
    switchBgm(beginningBgm);

    // 隱藏「我準備好啦！」
    readyButton.classList.add("hidden-ready");

    // 隱藏迎接企鵝
    welcomePenguin.classList.add("hidden-penguin");

    // 顯示地圖
    setTimeout(function () {
        mapScreen.classList.remove("hidden-map");
    }, 300);

});


// ==========================
// MAP INTRO DIALOGUE
// ==========================
let mapIntroFinished = false;
const territoryIcons = document.querySelectorAll(".map-icon");
const councilIcon = document.getElementById("council-icon");

const councilLand = document.getElementById("council-land");
const councilBackMap = document.getElementById("council-back-map");

const councilScene = document.getElementById("council-scene");
const councilEnding = document.getElementById("council-ending");

const councilSitButton = document.getElementById("council-sit-button");

const councilVideo = document.getElementById("council-video");

const councilEndingImages = [
    "Image/結語 1.png",
    "Image/結語 2.png",
    "Image/結語 3.png",
    "Image/結語 4.png",
    "Image/結語 5.png",
    "Image/結語 6.png",
    "Image/結語 7.png",
    "Image/結語 8.png",
    "Image/結語 9.png",
    "Image/結語 10.png",
    "Image/結語 11.png",
    "Image/結語 12.png",
    "Image/結語 13.png",
    "Image/結語 14.png",
    "Image/結語 15.png",
    "Image/結語 16.png",
    "Image/結語 17.png",
    "Image/結語 18.png",
    "Image/結語 19.png",
    "Image/結語 20.png",
    "Image/結語 21.png"
];

let councilEndingIndex = 0;
let councilEndingFinished = false;

// 七個領地未探索完成前，議會廳保持鎖定
councilIcon.classList.add("council-locked");

function checkCouncilUnlock() {
    const allTerritoriesFinished =
        localStorage.getItem("spoiledLandFinished") === "true" &&
        localStorage.getItem("researcherAllFinished") === "true" &&
        localStorage.getItem("securityLandFinished") === "true" &&
        localStorage.getItem("cornerLandFinished") === "true" &&
        localStorage.getItem("darkLandFinished") === "true" &&
        localStorage.getItem("maskLandFinished") === "true" &&
        localStorage.getItem("ghostTrustUnlocked") === "true";

    if (allTerritoriesFinished) {
        councilIcon.classList.remove("council-locked");
    }
}
checkCouncilUnlock();

councilIcon.addEventListener("click", function () {
    if (!mapIntroFinished) return;

    // 未完成七個領地 → 暫時唔俾入
    if (councilIcon.classList.contains("council-locked")) {
        return;
    }

        // 🏛️ 議會廳 BGM
    switchBgm(councilBgm);

    if (councilEndingFinished) {
    councilScene.src = "Image/企鵝議會廳 2.png";
    councilScene.style.display = "block";
    councilEnding.style.display = "none";
    councilSitButton.style.display = "block";
    councilBackMap.style.display = "block";
}

// 進入議會廳
mapScreen.classList.add("hidden-map");
councilLand.classList.remove("hidden-land");
});

councilBackMap.addEventListener("click", function () {

    // 🗺️ 返回地圖 BGM
    switchBgm(beginningBgm);

    councilLand.classList.add("hidden-land");
    mapScreen.classList.remove("hidden-map");
});

// 撳議會廳圖 1 → 開始結語
councilScene.addEventListener("click", function () {

    // 結語已經睇完 → 再撳冇反應
    if (councilEndingFinished) return;

    // 開始結語後，不准中途返回地圖
    councilBackMap.style.display = "none";

    councilEndingIndex = 0;
    councilEnding.src = councilEndingImages[0];
    councilEnding.style.display = "block";
});

// 結語 1 → 21 逐張 click
councilEnding.addEventListener("click", function () {
    councilEndingIndex++;

    if (councilEndingIndex < councilEndingImages.length) {
        councilEnding.src = councilEndingImages[councilEndingIndex];
        return;
    }

    // 結語 21 完成
    councilEnding.style.display = "none";

    councilEndingFinished = true;

councilScene.src = "Image/企鵝議會廳 2.png";
councilSitButton.style.display = "block";
councilBackMap.style.display = "block";
});

// 撳「坐低」→ 播放獨白 Video
councilSitButton.addEventListener("click", function () {

        // 🎬 獨白影片本身有 BGM，所以停止議會廳 BGM
    councilBgm.pause();
    councilBgm.currentTime = 0;

    councilScene.style.display = "none";
    councilSitButton.style.display = "none";
    councilBackMap.style.display = "none";

    councilVideo.style.display = "block";
    councilVideo.currentTime = 0;
    councilVideo.play();
});




// 地圖介紹期間，所有領地變灰＋唔俾撳
territoryIcons.forEach(function (icon) {
    icon.classList.add("locked-intro");
});
mapDialogue.addEventListener("click", function () {

    // 已經講完 → 再撳都唔做任何事
    if (mapIntroFinished) return;

    mapDialogueIndex++;

    if (mapDialogueIndex < mapDialogues.length) {
        mapDialogue.src = mapDialogues[mapDialogueIndex];
  } else {
    // 對白全部完成
    mapIntroFinished = true;

    // 恢復所有領地顏色＋可以撳
    territoryIcons.forEach(function (icon) {
        icon.classList.remove("locked-intro");
    });
}
});

// ==========================
// MAP WELCOME PENGUIN HELP
// ==========================

mapWelcomePenguinHotspot.addEventListener("click", () => {

    console.log("🎀 PENGUIN CLICKED");
    console.log("mapIntroFinished =", mapIntroFinished);

    if (!mapIntroFinished) return;

    console.log("OPENING RESTART MENU");

    restartMenu.style.display = "block";

    restartPanel1.style.display = "block";
    restartPanel2.style.display = "none";
    restartPanel3.style.display = "none";

    document.querySelector(".restart-1-explore").style.display = "block";
document.querySelector(".restart-1-back").style.display = "block";
});

// ============================
// RESTART MENU - PAGE 1
// ============================

const restart1Explore = document.querySelector(".restart-1-explore");
const restart1Back = document.querySelector(".restart-1-back");

const restart3Confirm = document.querySelector(".restart-3-confirm");
const restart3Back = document.querySelector(".restart-3-back");


// 「重新探索」→ 去警告頁 restart 2
restart1Explore.addEventListener("click", () => {

    restartPanel1.style.display = "none";
    restartPanel2.style.display = "block";

});


// 第一頁「返回地圖」→ 關閉 menu
restart1Back.addEventListener("click", () => {

    restartPanel1.style.display = "none";
    restartMenu.style.display = "none";

});

 // ============================
// RESTART MENU - PAGE 2
// click anywhere → PAGE 3
// ============================

restartPanel2.addEventListener("click", () => {

    restartPanel2.style.display = "none";
    restartPanel3.style.display = "block";

    document.querySelector(".restart-3-confirm").style.display = "block";
    document.querySelector(".restart-3-back").style.display = "block";

});

// ============================
// RESTART MENU - PAGE 3
// ============================

// 返回地圖：乜都唔清除
restart3Back.addEventListener("click", () => {

    restartPanel3.style.display = "none";

    restart3Confirm.style.display = "none";
    restart3Back.style.display = "none";

    restartMenu.style.display = "none";

});


// 確認重新探索：清除所有進度 + 由頭開始
restart3Confirm.addEventListener("click", () => {

    localStorage.clear();

    location.reload();

});


const darkIcon = document.querySelector(".dark-icon");
const darkLand = document.getElementById("dark-land");

const darkPenguin = document.querySelector(".dark-penguin");
const darkPenguinHotspot =
    document.querySelector(".dark-penguin-hotspot");

const darkNarration =
    document.getElementById("dark-narration");

const darkIntroDialogue =
    document.getElementById("dark-intro-dialogue");

const darkShadowMirror =
    document.querySelector(".dark-shadow-mirror");

    const darkShadowMirrorHotspot =
    document.querySelector(".dark-shadow-mirror-hotspot");

const darkPenguinIntroImages = [
    "Image/亂入事件 1.png",
    "Image/亂入事件 2.png",
    "Image/亂入事件 3.png",
    "Image/亂入事件 4.png",
    "Image/亂入事件 5.png",
    "Image/亂入事件 6.png",
    "Image/亂入事件 7.png",
    "Image/亂入事件 8.png",
    "Image/亂入事件 9.png",
    "Image/亂入事件 10.png",
    "Image/亂入事件 11.png",
    "Image/亂入事件 12.png",
    "Image/亂入事件 13.png",
    "Image/亂入事件 14.png",
    "Image/亂入事件 15.png",
    "Image/亂入事件 16.png",
    "Image/亂入事件 17.png",
    "Image/亂入事件 18.png",
    "Image/亂入事件 19.png",
    "Image/亂入事件 20.png",
    "Image/亂入事件 21.png",

   "Image/暗黑企鵝領地 介紹 1.png",
   "Image/暗黑企鵝領地 介紹 2.png",
   "Image/暗黑企鵝領地 介紹 3.png",
   "Image/暗黑企鵝領地 介紹 4.png",
   "Image/暗黑企鵝領地 介紹 5.png",
   "Image/暗黑企鵝領地 介紹 6.png",
   "Image/暗黑企鵝領地 介紹 7.png",
   "Image/暗黑企鵝領地 介紹 8.png",
   "Image/暗黑企鵝領地 介紹 9.png",
   "Image/暗黑企鵝領地 介紹 10.png",
   "Image/暗黑企鵝領地 介紹 11.png"
];

let darkPenguinIntroIndex = 0;
let darkPenguinIntroFinished =
    localStorage.getItem("darkPenguinIntroFinished") === "true";

// ==============================
// DARK LAND PROGRESS
// ==============================

// 第一次探索時，目前唯一可以互動嘅 item
let darkCurrentStep =
    localStorage.getItem("darkCurrentStep") || "mirror";

function saveDarkCurrentStep(step) {
    darkCurrentStep = step;
    localStorage.setItem("darkCurrentStep", step);
}
function restoreDarkLandProgress() {
    // 先清走所有可能殘留嘅 glow
    darkShadowMirror.classList.remove("dark-item-glow");
    darkEmotionBox.classList.remove("dark-item-glow");
    darkAbyssDoor.classList.remove("dark-item-glow");
    darkEnergyConverter.classList.remove("dark-item-glow");
    darkPenguin.classList.remove("dark-item-glow");

    // 根據離開時嘅進度，還原下一個可互動位置
    if (darkCurrentStep === "mirror") {
        darkShadowMirror.classList.add("dark-item-glow");
    }

    if (darkCurrentStep === "emotionBox") {
        darkEmotionBox.classList.add("dark-item-glow");
    }

    if (darkCurrentStep === "abyssDoor") {
        darkAbyssDoor.classList.add("dark-item-glow");
    }

    if (darkCurrentStep === "energyConverter") {
        darkEnergyConverter.classList.add("dark-item-glow");
    }

    if (darkCurrentStep === "shadowNote") {
        darkPenguin.classList.add("dark-item-glow");
    }

    // ending / finished 唔需要任何 item 發光
}

// 完成整個暗黑領地後，會變成 true
let darkLandFinished = false;
const darkStoryFinished =
    localStorage.getItem("darkLandFinished") === "true";

if (darkStoryFinished) {
    darkCurrentStep = "finished";
}

const darkPenguinRandomSpeechImages = [
    "Image/暗黑企鵝 random speech 1.png",
    "Image/暗黑企鵝 random speech 2.png",
    "Image/暗黑企鵝 random speech 3.png",
    "Image/暗黑企鵝 random speech 4.png",
    "Image/暗黑企鵝 random speech 5.png",
    "Image/暗黑企鵝 random speech 6.png"
];

darkPenguinHotspot.addEventListener("click", function () {

        if (darkPenguinIntroFinished) {
    const randomIndex =
        Math.floor(Math.random() * darkPenguinRandomSpeechImages.length);

    darkIntroDialogue.src =
        darkPenguinRandomSpeechImages[randomIndex];

    darkIntroDialogue.classList.add("random-speech-mode");
    darkIntroDialogue.style.display = "block";

    return;
}

    // 收起旁白
    darkNarration.style.display = "none";

    // 暗黑企鵝停止發光
    darkPenguin.classList.remove("dark-penguin-glow");

    darkIntroDialogue.classList.remove("random-speech-mode");

    // 從第一張開始
    darkPenguinIntroIndex = 0;
    darkIntroDialogue.src =
        darkPenguinIntroImages[darkPenguinIntroIndex];

    // 顯示亂入事件 1
    darkIntroDialogue.style.display = "block";
});

darkIntroDialogue.addEventListener("click", function () {
    
    // 首次介紹已完成 → 現在顯示的是 random speech
    if (darkPenguinIntroFinished) {
        darkIntroDialogue.style.display = "none";
        return;
    }

    darkPenguinIntroIndex++;

    // 仲有下一張
    if (darkPenguinIntroIndex < darkPenguinIntroImages.length) {
        darkIntroDialogue.src =
            darkPenguinIntroImages[darkPenguinIntroIndex];
        return;
    }

   // 全部介紹完成 → 返回領地
darkIntroDialogue.style.display = "none";

darkPenguinIntroFinished = true;
localStorage.setItem("darkPenguinIntroFinished", "true");

// 第一件 Item：只有暗影鏡發光
darkShadowMirror.classList.add("dark-item-glow");
darkEmotionBox.classList.remove("dark-item-glow");

});


const darkShadowMirrorDialogue =
    document.getElementById("dark-shadow-mirror-dialogue");

    const darkShadowMirrorImages = [];

// 暗影鏡 1–35
for (let i = 1; i <= 35; i++) {
    darkShadowMirrorImages.push(`Image/暗影鏡 ${i}.png`);
}

// 暗影鏡 36–46：Record 1.1–1.11
for (let i = 1; i <= 11; i++) {
    const number = 35 + i;
    darkShadowMirrorImages.push(
        `Image/暗影鏡 ${number} Record 1.${i}.png`
    );
}

// 暗影鏡 47–62：Record 2.1–2.16
for (let i = 1; i <= 16; i++) {
    const number = 46 + i;
    darkShadowMirrorImages.push(
        `Image/暗影鏡 ${number} Record 2.${i}.png`
    );
}

// 暗影鏡 63–81：Record 3.1–3.19
for (let i = 1; i <= 19; i++) {
    const number = 62 + i;
    darkShadowMirrorImages.push(
        `Image/暗影鏡 ${number} Record 3.${i}.png`
    );
}

// 暗影鏡 82–89
for (let i = 82; i <= 89; i++) {
    darkShadowMirrorImages.push(`Image/暗影鏡 ${i}.png`);
}

let darkShadowMirrorIndex = 0;

darkShadowMirrorHotspot.addEventListener("click", function () {
        if (!darkLandFinished && darkCurrentStep !== "mirror") return;

    // 暗影鏡停止發光
    darkShadowMirror.classList.remove("dark-item-glow");

    // 從第一張開始
    darkShadowMirrorIndex = 0;

    darkShadowMirrorDialogue.src =
        darkShadowMirrorImages[darkShadowMirrorIndex];

    darkShadowMirrorDialogue.style.display = "block";
});
let darkShadowMirrorAutoPlaying = false;

// 自動播放：每張停 2 秒
function playDarkShadowMirrorAuto(endNumber) {
    darkShadowMirrorAutoPlaying = true;

    function nextImage() {
        if (darkShadowMirrorIndex + 1 < endNumber) {
            darkShadowMirrorIndex++;

            darkShadowMirrorDialogue.src =
                darkShadowMirrorImages[darkShadowMirrorIndex];

            setTimeout(nextImage, 2000);
        } else {
            darkShadowMirrorAutoPlaying = false;
        }
    }

    setTimeout(nextImage, 2000);
}


darkShadowMirrorDialogue.addEventListener("click", function () {

    // 自動播放期間唔接受 click
    if (darkShadowMirrorAutoPlaying) return;

    const currentNumber = darkShadowMirrorIndex + 1;


    // ===== 36 → 37：按一下 =====
    // 37 → 40：自動
    if (currentNumber === 36) {
        darkShadowMirrorIndex++;
        darkShadowMirrorDialogue.src =
            darkShadowMirrorImages[darkShadowMirrorIndex];

        playDarkShadowMirrorAuto(40);
        return;
    }


    // ===== 40 → 41：按一下 =====
    // 41 → 45：自動
    if (currentNumber === 40) {
        darkShadowMirrorIndex++;
        darkShadowMirrorDialogue.src =
            darkShadowMirrorImages[darkShadowMirrorIndex];

        playDarkShadowMirrorAuto(45);
        return;
    }

    // ===== 46 → 47：自動 =====
if (currentNumber === 46) {
    playDarkShadowMirrorAuto(47);
    return;
}

    // ===== 48 → 51：自動 =====
    if (currentNumber === 48) {
        playDarkShadowMirrorAuto(51);
        return;
    }


    // ===== 52 → 56：自動 =====
    if (currentNumber === 52) {
        playDarkShadowMirrorAuto(56);
        return;
    }


    // ===== 57 → 61：自動 =====
    if (currentNumber === 57) {
        playDarkShadowMirrorAuto(61);
        return;
    }

    // ===== 62 → 63：自動 =====
if (currentNumber === 62) {
    playDarkShadowMirrorAuto(63);
    return;
}

    // ===== 64 → 66：自動 =====
    if (currentNumber === 64) {
        playDarkShadowMirrorAuto(66);
        return;
    }


    // ===== 67 → 71：自動 =====
    if (currentNumber === 67) {
        playDarkShadowMirrorAuto(71);
        return;
    }


    // ===== 72 → 76：自動 =====
    if (currentNumber === 72) {
        playDarkShadowMirrorAuto(76);
        return;
    }


    // ===== 77 → 81：自動 =====
    if (currentNumber === 77) {
        playDarkShadowMirrorAuto(81);
        return;
    }


    // ===== 其他全部：按一下去下一張 =====
    darkShadowMirrorIndex++;

    if (darkShadowMirrorIndex < darkShadowMirrorImages.length) {
        darkShadowMirrorDialogue.src =
            darkShadowMirrorImages[darkShadowMirrorIndex];

        return;
    }


   // ===== 89 完成 → 關閉暗影鏡 =====
darkShadowMirrorDialogue.style.display = "none";

// 暗影鏡停止發光
darkShadowMirror.classList.remove("dark-item-glow");

// 下一件 Item：情緒儲存箱開始發光
saveDarkCurrentStep("emotionBox");
darkEmotionBox.classList.add("dark-item-glow");

console.log("📦 EMOTION BOX GLOW TRIGGERED");
console.log(darkEmotionBox.className);
});

const darkEmotionBox =
    document.querySelector(".dark-emotion-box");

const darkAbyssDoor =
    document.querySelector(".dark-abyss-door");

 const darkEnergyConverter =
    document.querySelector(".dark-energy-converter");

const darkAbyssDoorHotspot =
    document.querySelector(".dark-abyss-door-hotspot");

const darkAbyssDoorDialogue =
    document.getElementById("dark-abyss-door-dialogue");

const darkShadowNoteHotspot =
    document.querySelector(".dark-shadow-note-hotspot");

const darkShadowNoteDialogue =
    document.getElementById("dark-shadow-note-dialogue");

const darkShadowNoteImages = [
    "Image/暗黑筆記簿 1.png",
    "Image/暗黑筆記簿 2.png",
    "Image/暗黑筆記簿 3.png",
    "Image/暗黑筆記簿 4.png",
    "Image/暗黑筆記簿 5.png",
    "Image/暗黑筆記簿 6.png",
    "Image/暗黑筆記簿 7.png",
    "Image/暗黑筆記簿 8.png",
    "Image/暗黑筆記簿 9.png",
    "Image/暗黑筆記簿 10.png",
    "Image/暗黑筆記簿 11.png"
];

let darkShadowNoteIndex = 0;

const darkAbyssDoorImages = [
    "Image/深淵之門 1.png",
    "Image/深淵之門 2.png",
    "Image/深淵之門 3.png",
    "Image/深淵之門 4.png",
    "Image/深淵之門 5.png",
    "Image/深淵之門 6.png",
    "Image/深淵之門 7.png",
    "Image/深淵之門 8.png",
    "Image/深淵之門 9.png",
    "Image/深淵之門 10.png"
];

let darkAbyssDoorIndex = 0;

// ================================
// ABYSS DOOR
// ================================

darkAbyssDoorHotspot.addEventListener("click", function () {
        if (!darkLandFinished && darkCurrentStep !== "abyssDoor") return;

    // 深淵之門停止發光
    darkAbyssDoor.classList.remove("dark-item-glow");

    // 從第 1 張開始
    darkAbyssDoorIndex = 0;

    darkAbyssDoorDialogue.src =
        darkAbyssDoorImages[darkAbyssDoorIndex];

    darkAbyssDoorDialogue.style.display = "block";
});


darkAbyssDoorDialogue.addEventListener("click", function () {

    darkAbyssDoorIndex++;

    // 1 → 10 逐張 click
    if (darkAbyssDoorIndex < darkAbyssDoorImages.length) {

        darkAbyssDoorDialogue.src =
            darkAbyssDoorImages[darkAbyssDoorIndex];

        return;
    }

    // 第 10 張完成 → 返回暗黑領地
    darkAbyssDoorDialogue.style.display = "none";

    // 下一件 Item：能量轉化器發光
    saveDarkCurrentStep("energyConverter");
darkEnergyConverter.classList.add("dark-item-glow");
});

// ==============================
// ENERGY CONVERTER
// ==============================

const darkEnergyConverterHotspot =
    document.querySelector(".dark-energy-converter-hotspot");

darkShadowNoteHotspot.addEventListener("click", function () {
    if (!darkLandFinished && darkCurrentStep !== "shadowNote") return;

    // 停止暗黑企鵝發光
    darkPenguin.classList.remove("dark-item-glow");

    darkShadowNoteIndex = 0;

    darkShadowNoteDialogue.src =
        darkShadowNoteImages[darkShadowNoteIndex];

    darkShadowNoteDialogue.style.display = "block";
});

darkShadowNoteDialogue.addEventListener("click", function () {
    darkShadowNoteIndex++;

    if (darkShadowNoteIndex < darkShadowNoteImages.length) {
        darkShadowNoteDialogue.src =
            darkShadowNoteImages[darkShadowNoteIndex];
        return;
    }

    // 11 完成 → 關閉
    darkShadowNoteDialogue.style.display = "none";

    // Ending Speech 期間鎖住所有 item
saveDarkCurrentStep("ending");

    // 開始暗黑企鵝 Ending Speech
darkEndingSpeechIndex = 0;

darkEndingSpeech.src =
    darkEndingSpeechImages[darkEndingSpeechIndex];

darkEndingSpeech.style.display = "block";
});

const darkEndingSpeech =
    document.getElementById("dark-ending-speech");

const darkEndingSpeechImages = [
    "Image/暗黑企鵝 ending speech 1.png",
    "Image/暗黑企鵝 ending speech 2.png",
    "Image/暗黑企鵝 ending speech 3.png",
    "Image/暗黑企鵝 ending speech 4.png",
    "Image/暗黑企鵝 ending speech 5.png",
    "Image/暗黑企鵝 ending speech 6.png",
    "Image/暗黑企鵝 ending speech 7.png",
    "Image/暗黑企鵝 ending speech 8.png",
    "Image/暗黑企鵝 ending speech 9.png"
];

let darkEndingSpeechIndex = 0;
darkEndingSpeech.addEventListener("click", function () {
    darkEndingSpeechIndex++;

    if (darkEndingSpeechIndex < darkEndingSpeechImages.length) {
        darkEndingSpeech.src =
            darkEndingSpeechImages[darkEndingSpeechIndex];
        return;
    }

    // Ending 9 完成 → 關閉對話框
darkEndingSpeech.style.display = "none";

// 暗黑領地故事完成，但其他 item 繼續鎖住
saveDarkCurrentStep("finished");

// 記錄已完成首次探索
localStorage.setItem("darkLandFinished", "true");

showSaveIndicator();
});

const darkEnergyConverterDialogue =
    document.getElementById("dark-energy-converter-dialogue");

const darkEnergyConverterImages = [
    "Image/能量轉化器 1.png",
    "Image/能量轉化器 2.png",
    "Image/能量轉化器 3.png",
    "Image/能量轉化器 4.png",
    "Image/能量轉化器 5.png",
    "Image/能量轉化器 6.png",
    "Image/能量轉化器 7.png",
    "Image/能量轉化器 8.png",
    "Image/能量轉化器 9.png",
    "Image/能量轉化器 10.png",
    "Image/能量轉化器 11.png",
    "Image/能量轉化器 12.png",
    "Image/能量轉化器 13.png",
    "Image/能量轉化器 14.png",
    "Image/能量轉化器 15.png",
    "Image/能量轉化器 16.png",
    "Image/能量轉化器 17.png",
    "Image/能量轉化器 18.png"
];

let darkEnergyConverterIndex = 0;


// 撳能量轉化器 → 開始
darkEnergyConverterHotspot.addEventListener("click", function () {
        if (!darkLandFinished && darkCurrentStep !== "energyConverter") return;

    // 停止發光
    darkEnergyConverter.classList.remove("dark-item-glow");

    darkEnergyConverterIndex = 0;

    darkEnergyConverterDialogue.src =
        darkEnergyConverterImages[darkEnergyConverterIndex];

    darkEnergyConverterDialogue.style.display = "block";
});


// 對白逐張撳
darkEnergyConverterDialogue.addEventListener("click", function () {

    darkEnergyConverterIndex++;

    if (darkEnergyConverterIndex < darkEnergyConverterImages.length) {

        darkEnergyConverterDialogue.src =
            darkEnergyConverterImages[darkEnergyConverterIndex];

        return;
    }

    // 18 完成 → 關閉
    darkEnergyConverterDialogue.style.display = "none";

        // 下一件：暗黑筆記簿
        saveDarkCurrentStep("shadowNote");

    // 筆記簿畫在企鵝身上，所以整隻企鵝發光
    darkPenguin.classList.add("dark-item-glow");
});

const darkEmotionBoxHotspot =
    document.querySelector(".dark-emotion-box-hotspot");

const darkEmotionBoxDialogue =
    document.getElementById("dark-emotion-box-dialogue");

const darkEmotionBoxImages = [
    "Image/情緒儲存箱 1.png",
    "Image/情緒儲存箱 2.png",
    "Image/情緒儲存箱 3.png",
    "Image/情緒儲存箱 4.png",
    "Image/情緒儲存箱 5.png",
    "Image/情緒儲存箱 6.png",
    "Image/情緒儲存箱 7.png",
    "Image/情緒儲存箱 8.png",
    "Image/情緒儲存箱 9.png",
    "Image/情緒儲存箱 10.png",
    "Image/情緒儲存箱 11.png",
    "Image/情緒儲存箱 12.png",
    "Image/情緒儲存箱 13.png",
    "Image/情緒儲存箱 14.png",
    "Image/情緒儲存箱 15.png"
];

const darkBackMap =
    document.getElementById("dark-back-map");

darkBackMap.addEventListener("click", function () {

    // 🗺️ 返回地圖 BGM
    switchBgm(beginningBgm);

    darkLand.classList.add("hidden-land");
    mapScreen.classList.remove("hidden-map");
});

// ================================
// EMOTION STORAGE BOX
// ================================

darkEmotionBoxHotspot.addEventListener("click", function () {
        if (!darkLandFinished && darkCurrentStep !== "emotionBox") return;

    // 停止發光
    darkEmotionBox.classList.remove("dark-item-glow");

    // 從第 1 張開始
    darkEmotionBoxIndex = 0;

    darkEmotionBoxDialogue.src =
        darkEmotionBoxImages[darkEmotionBoxIndex];

    darkEmotionBoxDialogue.style.display = "block";
});


darkEmotionBoxDialogue.addEventListener("click", function () {

    darkEmotionBoxIndex++;

    // 1 → 15 逐張 click
    if (darkEmotionBoxIndex < darkEmotionBoxImages.length) {

        darkEmotionBoxDialogue.src =
            darkEmotionBoxImages[darkEmotionBoxIndex];

        return;
    }

    // 第 15 張完成 → 返回暗黑領地
    darkEmotionBoxDialogue.style.display = "none";

    // 下一件 Item：深淵之門發光
  saveDarkCurrentStep("abyssDoor");
darkAbyssDoor.classList.add("dark-item-glow");
});

let darkEmotionBoxIndex = 0;

// =====================
// ENTER DARK PENGUIN LAND
// =====================

darkIcon.addEventListener("click", function () {

    if (!mapIntroFinished) return;

        // 🖤🐧 暗黑企鵝領地 BGM
    switchBgm(darkBgm);

    mapScreen.classList.add("hidden-map");
    darkLand.classList.remove("hidden-land");

    // ==============================
    // 第一次進入暗黑領地
    // ==============================
    if (!darkPenguinIntroFinished) {
        darkNarration.style.display = "block";
        darkPenguin.classList.add("dark-penguin-glow");
        return;
    }

    // ==============================
    // 已經開始探索過 → 還原離開時進度
    // ==============================
    darkNarration.style.display = "none";
    darkPenguin.classList.remove("dark-penguin-glow");

    restoreDarkLandProgress();
});


// =========================
// ENTER RESEARCHER PENGUIN LAND
// =========================

const researcherLand = document.getElementById("researcher-land");
const researcherIcon = document.getElementById("researcher-icon");

const researcherPenguinHotspot =
    document.querySelector(".researcher-penguin-hotspot");

    const researcherPenguin =
    document.querySelector(".researcher-penguin");

const researcherIntro =
    document.getElementById("researcher-intro");

let researcherIntroIndex = 0;
let researcherIntroFinished =
    localStorage.getItem("researcherIntroFinished") === "true";
 let researcherWhiteboardFinished = false;
let researcherDatabaseFinished = false;
let researcherWindowFinished = false;
let researcherNotebookFinished = false;
let researcherLaptopFinished = false;

let researcherAllFinished =
    localStorage.getItem("researcherAllFinished") === "true";

function checkResearcherAllFinished() {
    if (
        researcherWhiteboardFinished &&
        researcherDatabaseFinished &&
        researcherWindowFinished &&
        researcherNotebookFinished &&
        researcherLaptopFinished &&
        !researcherAllFinished
    ) {
        researcherAllFinished = true;

        localStorage.setItem("researcherAllFinished", "true");

        showSaveIndicator();
    }
}

researcherIcon.addEventListener("click", function () {

    // 地圖介紹未完成 → 唔可以入
    if (!mapIntroFinished) return;

        // 📚🐧 研究員企鵝領地 BGM
    switchBgm(researcherBgm);

    // 隱藏地圖
    mapScreen.classList.add("hidden-map");

    // 顯示研究員領地
    researcherLand.classList.remove("hidden-land");

    // 第一次未完成介紹 → 📚🐧發光
    if (!researcherIntroFinished) {
    researcherPenguin.classList.add("researcher-needs-attention");
} else {
    researcherPenguin.classList.remove("researcher-needs-attention");
}

});

const researcherIntroImages = [
    "Image/研究員企鵝 介紹 1.png",
    "Image/研究員企鵝 介紹 2.png",
    "Image/研究員企鵝 介紹 3.png",
    "Image/研究員企鵝 介紹 4.png",
    "Image/研究員企鵝 介紹 5.png",
    "Image/研究員企鵝 介紹 6.png",
    "Image/研究員企鵝 介紹 7.png",
    "Image/研究員企鵝 介紹 8.png",
    "Image/研究員企鵝 介紹 9.png",
    "Image/研究員企鵝 介紹 10.png",
    "Image/研究員企鵝 介紹 11.png",
    "Image/研究員企鵝 介紹 12.png",
    "Image/研究員企鵝 介紹 13.png",
    "Image/研究員企鵝 介紹 14.png",
    "Image/研究員企鵝 介紹 15.png"
];

const researcherRandomSpeeches = [
    "Image/研究員企鵝 random speech 1.png",
    "Image/研究員企鵝 random speech 2.png",
    "Image/研究員企鵝 random speech 3.png",
    "Image/研究員企鵝 random speech 4.png",
    "Image/研究員企鵝 random speech 5.png",
    "Image/研究員企鵝 random speech 6.png"
];

// 撳研究員企鵝 → 開始介紹
researcherPenguinHotspot.addEventListener("click", function () {

    // 第一次：正式介紹
    if (!researcherIntroFinished) {

        researcherPenguin.classList.remove("researcher-needs-attention");

        researcherIntroIndex = 0;
        researcherIntro.src = researcherIntroImages[0];
        researcherIntro.style.display = "block";

        return;
    }

    // 之後：random speech
    const randomIndex =
        Math.floor(Math.random() * researcherRandomSpeeches.length);

    researcherIntro.src = researcherRandomSpeeches[randomIndex];
    researcherIntro.style.display = "block";
});

researcherIntro.addEventListener("click", function () {

    // 如果介紹已經完成，
    // 而家顯示緊嘅只係 random speech → 撳一下收起
    if (researcherIntroFinished) {
        researcherIntro.style.display = "none";
        return;
    }

    // 第一次介紹 → 下一張
    researcherIntroIndex++;

    if (researcherIntroIndex < researcherIntroImages.length) {

        researcherIntro.src =
            researcherIntroImages[researcherIntroIndex];

    } else {

        // 15 張介紹完成
        researcherIntro.style.display = "none";

        researcherIntroFinished = true;
        localStorage.setItem("researcherIntroFinished", "true");

        showSaveIndicator();
    }

});

// =========================
// RESEARCHER ROOM LOCK
// =========================

function researcherRoomIsUnlocked() {
    return researcherIntroFinished;
}

// =========================
// RESEARCHER WHITEBOARD
// =========================

const researcherWhiteboardHotspot =
    document.querySelector(".researcher-whiteboard-hotspot");

researcherWhiteboardHotspot.addEventListener("click", function () {

    // 📚🐧 未介紹完 → 唔俾撳
    if (!researcherRoomIsUnlocked()) return;

    console.log("📝 WHITEBOARD CLICKED");
});

// =========================
// RESEARCHER WHITEBOARD SCENE
// =========================


const researcherWhiteboardDialogue =
    document.getElementById("researcher-whiteboard-dialogue");

const researcherWhiteboardImages = [
    "Image/思考白版 1.png",
    "Image/思考白版 2.png",
    "Image/思考白版 3.png",
    "Image/思考白版 4.png",
    "Image/思考白版 5.png",
    "Image/思考白版 6.png",
    "Image/思考白版 7.png",
    "Image/思考白版 8.png",
    "Image/思考白版 9.png",
    "Image/思考白版 10.png",
    "Image/思考白版 11.png",
    "Image/思考白版 12.png",
    "Image/思考白版 13.png",
    "Image/思考白版 14.png",
    "Image/思考白版 15.png",
    "Image/思考白版 16.png",
    "Image/思考白版 17.png",
    "Image/思考白版 18.png",
    "Image/思考白版 19.png",
    "Image/思考白版 20.png",
    "Image/思考白版 21.png",
    "Image/思考白版 22.png",
    "Image/思考白版 23.png"
];

let researcherWhiteboardIndex = 0;

// 撳白板 → 直接切入白板 scene
researcherWhiteboardHotspot.addEventListener("click", function () {

    if (!researcherRoomIsUnlocked()) return;

    researcherWhiteboardIndex = 0;

    researcherWhiteboardDialogue.src =
        researcherWhiteboardImages[0];

    // 顯示白板 scene，直接蓋住研究員房
    researcherWhiteboardDialogue.style.display = "block";
});


// 白板 scene → 逐張播放
researcherWhiteboardDialogue.addEventListener("click", function () {

    researcherWhiteboardIndex++;

    if (
        researcherWhiteboardIndex <
        researcherWhiteboardImages.length
    ) {
        researcherWhiteboardDialogue.src =
            researcherWhiteboardImages[researcherWhiteboardIndex];

   } else {

    // 23張全部完成
    researcherWhiteboardFinished = true;
    checkResearcherAllFinished();

    // 關閉白板 scene → 返回研究員領地
    researcherWhiteboardDialogue.style.display = "none";
}
});

// 白板 scene → 逐張播放
researcherWhiteboardDialogue.addEventListener("click", function () {
});


// =========================
// RESEARCHER - DATABASE
// =========================

const researcherDatabaseHotspot =
    document.querySelector(".researcher-database-hotspot");

const researcherDatabaseDialogue =
    document.getElementById("researcher-database-dialogue");

    const researcherProjectHotspot =
    document.getElementById("researcher-project-hotspot");

const researcherDatabaseImages = [
    "Image/資料庫 speech 1.png",
    "Image/資料庫 speech 2.png",
    "Image/資料庫 speech 3.png",
    "Image/資料庫 speech 4.png",
    "Image/資料庫 speech 5.png",
    "Image/資料庫 speech 6.png",
    "Image/資料庫 speech 7.png",
    "Image/資料庫 speech 8.png",
    "Image/資料庫 speech 9.png",
    "Image/資料庫 speech 10.png",
    "Image/資料庫 speech 11.png",
    "Image/資料庫 speech 12.png",
    "Image/資料庫 speech 13.png",
    "Image/資料庫 speech 14.png",
    "Image/資料庫 speech 15.png"
];

let researcherDatabaseIndex = 0;


// 撳資料庫 → 進入資料庫 scene
researcherDatabaseHotspot.addEventListener("click", function () {

    if (!researcherRoomIsUnlocked()) return;

    researcherDatabaseIndex = 0;

    researcherDatabaseDialogue.src =
        researcherDatabaseImages[0];

    researcherProjectHotspot.style.display = "none";
    researcherDatabaseDialogue.style.display = "block";
});


// 資料庫 scene → speech 1 至 15
researcherDatabaseDialogue.addEventListener("click", function () {

    // 已經去到 speech 15 → 停住
    if (
        researcherDatabaseIndex ===
        researcherDatabaseImages.length - 1
    ) {
        return;
    }

    researcherDatabaseIndex++;

    researcherDatabaseDialogue.src =
        researcherDatabaseImages[researcherDatabaseIndex];

    // 去到 speech 15 → 顯示研究項目總覽 hotspot
    if (
        researcherDatabaseIndex ===
        researcherDatabaseImages.length - 1
    ) {
        researcherProjectHotspot.style.display = "block";
    }
});

// =========================
// DATABASE - PROJECT OVERVIEW
// =========================

const researcherProjectOverview =
    document.getElementById("researcher-project-overview");

let researcherProjectOverviewIndex = 0;

const researcherProjectOverviewImages = [
    "Image/研究項目總覽 P.1.png",
    "Image/研究項目總覽 P.2.png"
];


// speech 15 撳小紙仔 → 進入研究項目總覽
researcherProjectHotspot.addEventListener("click", function (event) {

    event.stopPropagation();

    researcherProjectOverviewIndex = 0;

    researcherProjectOverview.src =
        researcherProjectOverviewImages[0];

    researcherProjectHotspot.style.display = "none";
    researcherProjectOverview.style.display = "block";
});


// 研究項目總覽 P.1 → P.2 → 返回研究員領地
researcherProjectOverview.addEventListener("click", function () {

    researcherProjectOverviewIndex++;

    if (
        researcherProjectOverviewIndex <
        researcherProjectOverviewImages.length
    ) {
        researcherProjectOverview.src =
            researcherProjectOverviewImages[researcherProjectOverviewIndex];

    } else {

    // P.2 完成 → 資料庫探索完成
    researcherDatabaseFinished = true;
    checkResearcherAllFinished();

    // 關閉資料庫 scene → 返回研究員領地
    researcherProjectOverview.style.display = "none";
    researcherDatabaseDialogue.style.display = "none";
    researcherProjectHotspot.style.display = "none";
}
});

// =========================
// RESEARCHER - WINDOW
// =========================

const researcherWindowHotspot =
    document.querySelector(".researcher-window-hotspot");

const researcherWindowDialogue =
    document.getElementById("researcher-window-dialogue");

const researcherWindowImages = [
    "Image/觀察之窗 1.png",
    "Image/觀察之窗 2.png",
    "Image/觀察之窗 3.png",
    "Image/觀察之窗 4.png",
    "Image/觀察之窗 5.png",
    "Image/觀察之窗 6.png",
    "Image/觀察之窗 7.png",
    "Image/觀察之窗 8.png",
    "Image/觀察之窗 9.png",
    "Image/觀察之窗 10.png",
    "Image/觀察之窗 11.png",
    "Image/觀察之窗 12.png",
    "Image/觀察之窗 13.png",
    "Image/觀察之窗 14.png",
    "Image/觀察之窗 15.png",
    "Image/觀察之窗 16.png"
];

let researcherWindowIndex = 0;


// 撳觀察之窗 → 進入觀察之窗 scene
researcherWindowHotspot.addEventListener("click", function () {

    if (!researcherRoomIsUnlocked()) return;

    researcherWindowIndex = 0;

    researcherWindowDialogue.src =
        researcherWindowImages[0];

    researcherWindowDialogue.style.display = "block";
});


// 觀察之窗 scene → 1 至 16 → 返回研究員領地
researcherWindowDialogue.addEventListener("click", function () {

    researcherWindowIndex++;

    if (
        researcherWindowIndex <
        researcherWindowImages.length
    ) {
        researcherWindowDialogue.src =
            researcherWindowImages[researcherWindowIndex];

    } else {

    // 16張全部完成
    researcherWindowFinished = true;
    checkResearcherAllFinished();

    // 返回研究員領地
    researcherWindowDialogue.style.display = "none";
}
});

// =========================
// RESEARCHER - NOTEBOOK
// =========================

const researcherNotebookHotspot =
    document.querySelector(".researcher-notebook-hotspot");

const researcherNotebookDialogue =
    document.getElementById("researcher-notebook-dialogue");

const researcherNotebookImages = [
    "Image/筆記簿 1.png",
    "Image/筆記簿 2.png",
    "Image/筆記簿 3.png",
    "Image/筆記簿 4.png",
    "Image/筆記簿 5.png",
    "Image/筆記簿 6.png",
    "Image/筆記簿 7.png",
    "Image/筆記簿 8.png",
    "Image/筆記簿 9.png",
    "Image/筆記簿 10.png",
    "Image/筆記簿 11.png",
    "Image/筆記簿 12.png",
    "Image/筆記簿 13.png",
    "Image/筆記簿 14.png",
    "Image/筆記簿 15.png",
    "Image/筆記簿 16.png",
    "Image/筆記簿 17.png",
    "Image/筆記簿 18.png",
    "Image/筆記簿 19.png",
    "Image/筆記簿 20.png",
    "Image/筆記簿 21.png",
    "Image/筆記簿 22.png",
    "Image/筆記簿 23.png",
    "Image/筆記簿 24.png",
    "Image/筆記簿 25.png",
    "Image/筆記簿 26.png"
];

let researcherNotebookIndex = 0;


// 撳筆記簿 → 進入筆記簿 scene
researcherNotebookHotspot.addEventListener("click", function () {

    if (!researcherRoomIsUnlocked()) return;

    researcherNotebookIndex = 0;

    researcherNotebookDialogue.src =
        researcherNotebookImages[0];

    researcherNotebookDialogue.style.display = "block";
});


// 筆記簿 scene → 1 至 26
researcherNotebookDialogue.addEventListener("click", function () {

    researcherNotebookIndex++;

    if (
        researcherNotebookIndex <
        researcherNotebookImages.length
    ) {
        researcherNotebookDialogue.src =
            researcherNotebookImages[researcherNotebookIndex];

   } else {

    // 26張全部完成
    researcherNotebookFinished = true;
    checkResearcherAllFinished();

    // 返回研究員領地
    researcherNotebookDialogue.style.display = "none";
}
});

// =========================
// RESEARCHER - LAPTOP
// =========================

const researcherLaptopHotspot =
    document.querySelector(".researcher-laptop-hotspot");

const researcherLaptopDialogue =
    document.getElementById("researcher-laptop-dialogue");

    const researcherLaptopReportHotspot =
    document.querySelector(".researcher-laptop-report-hotspot");

    const researcherLaptopReport =
    document.getElementById("researcher-laptop-report");

const researcherLaptopImages = [
    "Image/laptop speech 1.png",
    "Image/laptop speech 2.png",
    "Image/laptop speech 3.png",
    "Image/laptop speech 4.png",
    "Image/laptop speech 5.png",
    "Image/laptop speech 6.png",
    "Image/laptop speech 7.png",
    "Image/laptop speech 8.png",
    "Image/laptop speech 9.png",
    "Image/laptop speech 10.png",
    "Image/laptop speech 11.png",
    "Image/laptop speech 12.png",
    "Image/laptop speech 13.png",
    "Image/laptop speech 14.png",
    "Image/laptop speech 15.png"
];

let researcherLaptopIndex = 0;
let researcherLaptopStage = "speech";


// 撳 laptop → 由 speech 1 開始
researcherLaptopHotspot.addEventListener("click", function () {

    if (!researcherRoomIsUnlocked()) return;

    researcherLaptopIndex = 0;
    researcherLaptopStage = "speech";

    researcherLaptopDialogue.src =
        researcherLaptopImages[0];

    researcherLaptopDialogue.style.display = "block";
});


// Laptop scene
researcherLaptopDialogue.addEventListener("click", function () {

    // speech 1 → 15
    if (researcherLaptopStage === "speech") {

        researcherLaptopIndex++;

        if (researcherLaptopIndex < researcherLaptopImages.length) {

            researcherLaptopDialogue.src =
                researcherLaptopImages[researcherLaptopIndex];

        } else {

           // speech 15 完成 → to report 1
researcherLaptopStage = "to-report-1";

researcherLaptopDialogue.src =
    "Image/laptop to report 1.png";

researcherLaptopReportHotspot.style.display = "block";
        }

               return;
    }

});

// =========================
// LAPTOP - REPORT 1
// =========================

researcherLaptopReportHotspot.addEventListener("click", function (event) {

    event.stopPropagation();

    // Report 1：Fun Fair
    if (researcherLaptopStage === "to-report-1") {

        researcherLaptopReportHotspot.style.display = "none";
        researcherLaptopStage = "report-1-page-1";

        researcherLaptopDialogue.style.display = "none";

        researcherLaptopReport.src =
            "Image/Project Development Report 1.png";

        researcherLaptopReport.style.display = "block";

        return;
    }

    // Report 2：Dissertation
    if (researcherLaptopStage === "to-report-2") {

        researcherLaptopReportHotspot.style.display = "none";
        researcherLaptopStage = "report-2-page-1";

        researcherLaptopDialogue.style.display = "none";

        researcherLaptopReport.src =
            "Image/Dissertation Report 1.png";

        researcherLaptopReport.style.display = "block";

        return;
    }

    // Report 3：Penguin World
if (researcherLaptopStage === "to-report-3") {

    researcherLaptopReportHotspot.style.display = "none";
    researcherLaptopStage = "report-3-page-1";

    researcherLaptopDialogue.style.display = "none";

    researcherLaptopReport.src =
        "Image/Penguin World Development Record 1.png";

    researcherLaptopReport.style.display = "block";

    return;
}
});

// Report 1 scene
researcherLaptopReport.addEventListener("click", function () {

    // P.1 → P.2
    if (researcherLaptopStage === "report-1-page-1") {

        researcherLaptopStage = "report-1-page-2";

        researcherLaptopReport.src =
            "Image/Project Development Report 2.png";

        return;
    }

    // P.2 → 返回 Laptop，進入 to report 2
    if (researcherLaptopStage === "report-1-page-2") {

    researcherLaptopStage = "to-report-2";

    researcherLaptopReport.style.display = "none";

    researcherLaptopDialogue.src =
        "Image/laptop to report 2.png";

    researcherLaptopDialogue.style.display = "block";

    // hotspot 移去第二個 folder
    researcherLaptopReportHotspot.style.left = "78%";
    researcherLaptopReportHotspot.style.top = "30%";

    researcherLaptopReportHotspot.style.display = "block";

    return;
}
// =====================
// REPORT 2 - DISSERTATION
// =====================

// P.1 → P.2
if (researcherLaptopStage === "report-2-page-1") {

    researcherLaptopStage = "report-2-page-2";

    researcherLaptopReport.src =
        "Image/Dissertation Report 2.png";

    return;
}

// P.2 → 返回 Laptop，進入 to report 3
if (researcherLaptopStage === "report-2-page-2") {

    researcherLaptopStage = "to-report-3";

    researcherLaptopReport.style.display = "none";

    researcherLaptopDialogue.src =
        "Image/laptop to report 3.png";

    researcherLaptopDialogue.style.display = "block";
// hotspot 移去第三個 folder
researcherLaptopReportHotspot.style.left = "78%";
researcherLaptopReportHotspot.style.top = "39%";
    researcherLaptopReportHotspot.style.display = "block";

    return;
}

// =====================
// REPORT 3 - PENGUIN WORLD
// =====================

// P.1 → P.2
if (researcherLaptopStage === "report-3-page-1") {

    researcherLaptopStage = "report-3-page-2";

    researcherLaptopReport.src =
        "Image/Penguin World Development Record 2.png";

    return;
}
// P.2 → 返回研究員領地
if (researcherLaptopStage === "report-3-page-2") {

    // 三份 Report 全部完成
    researcherLaptopFinished = true;
    checkResearcherAllFinished();

    researcherLaptopReport.style.display = "none";
    researcherLaptopDialogue.style.display = "none";
    researcherLaptopReportHotspot.style.display = "none";

    researcherLaptopStage = "speech";
    researcherLaptopIndex = 0;

    // hotspot reset 回 File 1 原本位置
    researcherLaptopReportHotspot.style.left = "";
    researcherLaptopReportHotspot.style.top = "";

    return;
}
});

// =========================
// RESEARCHER - BACK TO MAP
// =========================

const researcherBackMap =
    document.getElementById("researcher-back-map");

researcherBackMap.addEventListener("click", function () {

        // 🗺️ 返回地圖 BGM
    switchBgm(beginningBgm);

    // 如果介紹未睇完 → 重置
    // 下次入嚟要由介紹 1 重新開始
    if (!researcherIntroFinished) {
        researcherIntroIndex = 0;

        researcherIntro.style.display = "none";
        researcherIntro.src = researcherIntroImages[0];

        // 清走企鵝發光狀態
        researcherPenguin.classList.remove("researcher-needs-attention");
    }

    // 隱藏研究員領地
    researcherLand.classList.add("hidden-land");

    // 顯示地圖
    mapScreen.classList.remove("hidden-map");
});

// ======================
// ENTER GHOST PENGUIN LAND
// ======================

const ghostReturnDialogue = document.querySelector(".ghost-return-dialogue");
ghostIcon.addEventListener("click", function () {

    // 地圖介紹未完成 → 唔可以入
    if (!mapIntroFinished) return;

        // 👻 幽靈企鵝領地 BGM
    switchBgm(ghostBgm);

    // 隱藏地圖
    mapScreen.classList.add("hidden-map");

    // 顯示幽靈企鵝領地
    setTimeout(function () {

        ghostLand.classList.remove("hidden-land");
// 第一次探訪：提示玩家撳 SHH 木牌
if (!ghostFirstVisitFinished) {
    document.querySelector(".ghost-shhh").classList.add("glowing");
}
        // ===============================
// 已建立信任：第三次及之後進入
// ===============================

if (ghostTrustUnlocked) {

    // 幽靈企鵝已經喺出面
    ghostPenguin.style.display = "block";

    // 入場時唔自動出對白
    ghostReturnDialogue.style.display = "none";

    // 暫時隱藏返回地圖
    ghostReturnMap.style.display = "none";

    return;
}

        // =========================
        // 第二次進入幽靈企鵝領地
        // =========================
        if (ghostFirstVisitFinished) {

            // 幽靈企鵝已經匿返入石屋
            ghostPenguin.style.display = "none";

            // 收起第一次 visit 留低嘅畫面
            ghostReturnMap.style.display = "none";
            ghostLeaving1.style.display = "none";

            // 收起第一次對白
            ghostDialogues.forEach(function (dialogue) {
                dialogue.style.display = "none";
            });

        }

    }, 300);

});

// ==================================
// TRUSTED RETURN DIALOGUE
// ==================================

ghostReturnDialogue.addEventListener("click", () => {

    // 收起「……你返咗嚟」
    ghostReturnDialogue.style.display = "none";

    // 顯示返回地圖
    ghostReturnMap.style.display = "block";

});

// ========================
// ENTER SPOILED PENGUIN LAND
// ========================

    spoiledIcon.addEventListener("click", function () {
    console.log("任性企鵝 ICON CLICKED");

    if (!mapIntroFinished) return;

        switchBgm(spoiledBgm);

    // 入場前收起所有任性企鵝對白
    document
        .querySelectorAll(
            ".spoiled-item-dialogue, .spoiled-random-dialogue, .spoiled-intro, .spoiled-want-dialogue"
        )
        .forEach(function (item) {
            item.style.display = "none";
        });

    // I WANT 未完成企鵝介紹前不可撳
    const wantHotspot = document.querySelector(".spoiled-want-hotspot");

    if (wantHotspot) {
        wantHotspot.style.pointerEvents =
            spoiledIntroFinished ? "auto" : "none";
    }

    // 隱藏企鵝世界地圖
    mapScreen.classList.add("hidden-map");

   // 顯示任性企鵝領地
setTimeout(function () {
    spoiledLand.classList.remove("hidden-land");

    console.log("timeout running");
    console.log("spoiledIntroFinished =", spoiledIntroFinished);

    // Intro 未完成 → 提示玩家撳任性企鵝
    if (!spoiledIntroFinished) {
        spoiledPenguin.classList.add("penguin-glow");
        console.log("GLOW ADDED:", spoiledPenguin.className);
        console.log("PENGUIN ELEMENT:", spoiledPenguin);
console.log("PENGUIN SRC:", spoiledPenguin.src);
    }
}, 300);
});

const spoiledBackMap = document.getElementById("spoiled-back-map");

spoiledBackMap.addEventListener("click", function (event) {
    event.stopPropagation();

        switchBgm(beginningBgm);

    // 收起任性企鵝領地
    spoiledLand.classList.add("hidden-land");

    // 顯示企鵝世界地圖
    mapScreen.classList.remove("hidden-map");
});

// ==========================
// 任性企鵝 INTRO
// ==========================

// 第一次撳任性企鵝 → 開始介紹
spoiledPenguin.addEventListener("click", function () {

    if (!spoiledIntroFinished) {

        spoiledPenguin.classList.remove("penguin-glow");

        spoiledIntroIndex = 0;
        spoiledIntro.src = spoiledIntroImages[spoiledIntroIndex];
        spoiledIntro.style.display = "block";
    }
});

// 撳對話框 → 下一句
spoiledIntro.addEventListener("click", function () {

    spoiledIntroIndex++;

    if (spoiledIntroIndex < spoiledIntroImages.length) {

        spoiledIntro.src = spoiledIntroImages[spoiledIntroIndex];

   } else {

    // 10句介紹完成
    spoiledIntro.style.display = "none";
    spoiledIntroFinished = true;

    localStorage.setItem("spoiledIntroFinished", "true");
    showSaveIndicator();

    spoiledWantHotspot.style.pointerEvents = "auto";
}

});

spoiledThrone.addEventListener("click", function () {
    // intro 未完成 → 唔俾撳
    if (!spoiledIntroFinished) {
        return;
    }

    // 入王座後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    console.log("👑 王座成功解鎖！");
});


spoiledPlayground.addEventListener("click", function () {
    if (!spoiledIntroFinished) return;

    // 入遊樂區後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    console.log("🛝 遊樂區成功解鎖！");
});


spoiledShop.addEventListener("click", function () {
    if (!spoiledIntroFinished) return;

    // 入想要商店後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    console.log("🛍️ 想要商店成功解鎖！");
});


spoiledChaos.addEventListener("click", function () {
    if (!spoiledIntroFinished) return;

    // 入混亂創造區後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    console.log("🧸 創造混亂區成功解鎖！");
});


let spoiledThroneFinished = false;
let spoiledPlaygroundFinished = false;
let spoiledRestFinished = false;
let spoiledShopFinished = false;
let spoiledChaosFinished = false;

function checkSpoiledAllFinished() {
    if (
        spoiledThroneFinished &&
        spoiledPlaygroundFinished &&
        spoiledRestFinished &&
        spoiledShopFinished &&
        spoiledChaosFinished
    ) {
        localStorage.setItem("spoiledLandFinished", "true");
        showSaveIndicator();
    }
}


// ========================
// 任性企鵝：王座互動
// ========================

const spoiledThroneDialogue =
    document.getElementById("spoiled-throne-dialogue");

const spoiledThroneDialogues = [
    "Image/王座 1.png",
    "Image/王座 2.png",
    "Image/王座 3.png"
];

let spoiledThroneDialogueIndex = 0;

spoiledThrone.addEventListener("click", function () {

    // 未完成任性企鵝介紹之前，不准撳其他物件
    if (!spoiledIntroFinished) return;

// 王座互動期間禁止 I WANT
spoiledWantSign.style.pointerEvents = "none";

// 每次重新入王座，都由第一張開始
spoiledThroneDialogueIndex = 0;
    spoiledThroneDialogue.src =
        spoiledThroneDialogues[spoiledThroneDialogueIndex];

    // 隱藏領地入面所有圖片
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {
            item.style.display = "none";
        });

    // 顯示王座第一張介紹
    spoiledThroneDialogue.style.display = "block";
});


spoiledThroneDialogue.addEventListener("click", function () {

    spoiledThroneDialogueIndex++;

    // 仲有下一張
    if (spoiledThroneDialogueIndex < spoiledThroneDialogues.length) {

        spoiledThroneDialogue.src =
            spoiledThroneDialogues[spoiledThroneDialogueIndex];

        return;
    }

    // 三張全部睇完
    spoiledThroneDialogue.style.display = "none";
    spoiledThroneFinished = true;
checkSpoiledAllFinished();

    // 王座互動完成 → 重新開放 I WANT
spoiledWantSign.style.pointerEvents = "auto";

    // 顯示返領地正常物件
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {

            // 唔好自動顯示：
            // 1. 物件對白
            // 2. intro
            // 3. random 對白
            // 4. I WANT 對白
            if (
                !item.classList.contains("spoiled-item-dialogue") &&
                !item.classList.contains("spoiled-intro") &&
                !item.classList.contains("spoiled-random-dialogue") &&
                !item.classList.contains("spoiled-want-dialogue")
            ) {
                item.style.display = "block";
            }
        });

    // 返回領地主畫面後，顯示「返回地圖」
    spoiledBackMap.style.display = "block";

});
// ========================
// 任性企鵝：遊樂區互動
// ========================

const spoiledPlaygroundDialogue =
    document.getElementById("spoiled-playground-dialogue");

const spoiledPlaygroundDialogues = [
    "Image/遊樂區1.png",
    "Image/遊樂區2.png"
];

let spoiledPlaygroundDialogueIndex = 0;

spoiledPlayground.addEventListener("click", function () {

    if (!spoiledIntroFinished) return;

    // 遊樂區互動期間禁止 I WANT
spoiledWantSign.style.pointerEvents = "none";

    // 入遊樂區後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    // 每次重新入遊樂區，由第一張開始
    spoiledPlaygroundDialogueIndex = 0;
    spoiledPlaygroundDialogue.src =
        spoiledPlaygroundDialogues[spoiledPlaygroundDialogueIndex];

    // 隱藏領地所有圖片
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {
            item.style.display = "none";
        });

    // 顯示遊樂區第一張介紹
    spoiledPlaygroundDialogue.style.display = "block";
});


spoiledPlaygroundDialogue.addEventListener("click", function () {

    spoiledPlaygroundDialogueIndex++;

    // 仲有下一張
    if (
        spoiledPlaygroundDialogueIndex <
        spoiledPlaygroundDialogues.length
    ) {
        spoiledPlaygroundDialogue.src =
            spoiledPlaygroundDialogues[spoiledPlaygroundDialogueIndex];

        return;
    }

    // 全部睇完
    spoiledPlaygroundDialogue.style.display = "none";
    spoiledPlaygroundFinished = true;
checkSpoiledAllFinished();

    // 遊樂區互動完成 → 重新開放 I WANT
spoiledWantSign.style.pointerEvents = "auto";

    // 顯示返領地
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {

            if (
                !item.classList.contains("spoiled-item-dialogue") &&
                !item.classList.contains("spoiled-intro") &&
                !item.classList.contains("spoiled-random-dialogue") &&
                !item.classList.contains("spoiled-want-dialogue")
            ) {
                item.style.display = "block";
            }

        });

    // 返回領地主畫面後，顯示「返回地圖」
    spoiledBackMap.style.display = "block";

});

// ==========================
// 任性企鵝：休息區互動
// ==========================

const spoiledRestDialogue =
    document.getElementById("spoiled-rest-dialogue");

const spoiledRestDialogues = [
    "Image/休息區1.png",
    "Image/休息區2.png",
    "Image/休息區3.png"
];

let spoiledRestDialogueIndex = 0;

spoiledRest.addEventListener("click", function () {

    // 未完成任性企鵝介紹，不准撳其他物件
    if (!spoiledIntroFinished) return;

    // item 互動期間禁止 I WANT
    spoiledWantSign.style.pointerEvents = "none";

    // 入休息區後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    spoiledRestDialogueIndex = 0;
    spoiledRestDialogue.src =
        spoiledRestDialogues[spoiledRestDialogueIndex];

    // 隱藏領地入面所有圖片
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {
            item.style.display = "none";
        });

    // 顯示休息區第一張介紹
    spoiledRestDialogue.style.display = "block";
});


spoiledRestDialogue.addEventListener("click", function () {

    spoiledRestDialogueIndex++;

    // 仲有下一張
    if (
        spoiledRestDialogueIndex <
        spoiledRestDialogues.length
    ) {
        spoiledRestDialogue.src =
            spoiledRestDialogues[spoiledRestDialogueIndex];

        return;
    }

    // 三張全部睇完
   spoiledRestDialogue.style.display = "none";
   spoiledRestFinished = true;
checkSpoiledAllFinished();

// item 互動完成 → 重新開放 I WANT
spoiledWantSign.style.pointerEvents = "auto";

    // 顯示返領地
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {

            // 唔好顯示其他對白圖片同 intro
            if (
                !item.classList.contains("spoiled-item-dialogue") &&
                !item.classList.contains("spoiled-intro") &&
                !item.classList.contains("spoiled-random-dialogue") &&
                !item.classList.contains("spoiled-want-dialogue")
            ) {
                item.style.display = "block";
            }

        });

    // 返回領地主畫面後，顯示「返回地圖」
    spoiledBackMap.style.display = "block";

});

// ==========================
// 任性企鵝：「想要」商店互動
// ==========================

const spoiledShopDialogue =
    document.getElementById("spoiled-shop-dialogue");

const spoiledShopDialogues = [
    "Image/「想要」商店1.png",
    "Image/「想要」商店2.png",
    "Image/「想要」商店3.png"
];

let spoiledShopDialogueIndex = 0;

spoiledShop.addEventListener("click", function () {

    // 未完成任性企鵝介紹之前，不准撳
    if (!spoiledIntroFinished) return;

    // 商店互動期間禁止 I WANT
spoiledWantSign.style.pointerEvents = "none";

    // 入商店後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    spoiledShopDialogueIndex = 0;

    spoiledShopDialogue.src =
        spoiledShopDialogues[spoiledShopDialogueIndex];

    // 隱藏領地所有圖片
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {
            item.style.display = "none";
        });

    // 顯示第一張商店介紹
    spoiledShopDialogue.style.display = "block";
});


spoiledShopDialogue.addEventListener("click", function () {

    spoiledShopDialogueIndex++;

    // 仲有下一張
    if (
        spoiledShopDialogueIndex <
        spoiledShopDialogues.length
    ) {
        spoiledShopDialogue.src =
            spoiledShopDialogues[spoiledShopDialogueIndex];

        return;
    }

    // 三張全部睇完
    spoiledShopDialogue.style.display = "none";
    spoiledShopFinished = true;
checkSpoiledAllFinished();

    // 商店互動完成 → 重新開放 I WANT
spoiledWantSign.style.pointerEvents = "auto";

    // 顯示返領地
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {

            if (
                !item.classList.contains("spoiled-item-dialogue") &&
                !item.classList.contains("spoiled-intro") &&
                !item.classList.contains("spoiled-random-dialogue") &&
                !item.classList.contains("spoiled-want-dialogue")
            ) {
                item.style.display = "block";
            }

        });

    // 返回領地主畫面後，顯示「返回地圖」
    spoiledBackMap.style.display = "block";

});

// ==========================
// 任性企鵝：混亂創造區互動
// ==========================

const spoiledChaosDialogue =
    document.getElementById("spoiled-chaos-dialogue");

const spoiledChaosDialogues = [
    "Image/混亂創造區1.png",
    "Image/混亂創造區2.png",
    "Image/混亂創造區3.png"
];

let spoiledChaosDialogueIndex = 0;

spoiledChaos.addEventListener("click", function () {

    // 未完成任性企鵝介紹之前，不准撳
    if (!spoiledIntroFinished) return;

    // 混亂創造區互動期間禁止 I WANT
spoiledWantSign.style.pointerEvents = "none";

    // 入混亂創造區後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    spoiledChaosDialogueIndex = 0;

    spoiledChaosDialogue.src =
        spoiledChaosDialogues[spoiledChaosDialogueIndex];

    // 隱藏領地所有圖片
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {
            item.style.display = "none";
        });

    // 顯示第一張混亂創造區介紹
    spoiledChaosDialogue.style.display = "block";
});


spoiledChaosDialogue.addEventListener("click", function () {

    spoiledChaosDialogueIndex++;

    // 仲有下一張
    if (
        spoiledChaosDialogueIndex <
        spoiledChaosDialogues.length
    ) {
        spoiledChaosDialogue.src =
            spoiledChaosDialogues[spoiledChaosDialogueIndex];

        return;
    }

    // 三張全部睇完
    spoiledChaosDialogue.style.display = "none";
    spoiledChaosFinished = true;
checkSpoiledAllFinished();

// 混亂創造區互動完成 → 重新開放 I WANT
spoiledWantSign.style.pointerEvents = "auto";

    // 顯示返任性企鵝領地
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {

            if (
                !item.classList.contains("spoiled-item-dialogue") &&
                !item.classList.contains("spoiled-intro") &&
                !item.classList.contains("spoiled-random-dialogue") &&
                !item.classList.contains("spoiled-want-dialogue") &&
                !item.classList.contains("spoiled-playground-dialogue") &&
                !item.classList.contains("spoiled-chaos-dialogue")
            ) {
                item.style.display = "block";
            }

        });

    // 返回領地主畫面後，顯示「返回地圖」
    spoiledBackMap.style.display = "block";

});

// ==============================
// 任性企鵝 Random 對話
// ==============================

const spoiledRandomDialogue = document.getElementById("spoiled-random-dialogue");

const spoiledRandomDialogues = [
    "Image/任性企鵝 speech1.png",
    "Image/任性企鵝 speech2.png",
    "Image/任性企鵝 speech3.png",
    "Image/任性企鵝 speech4.png"
];

spoiledPenguin.addEventListener("click", function () {

    // 未完成任性企鵝 intro，就唔出 random 對白
    if (!spoiledIntroFinished) return;

    // Random 揀一句
    const randomIndex = Math.floor(
        Math.random() * spoiledRandomDialogues.length
    );

    spoiledRandomDialogue.src =
        spoiledRandomDialogues[randomIndex];

    spoiledRandomDialogue.style.display = "block";
});


// 撳對白 → 收返埋
spoiledRandomDialogue.addEventListener("click", function (event) {

    event.stopPropagation();

    spoiledRandomDialogue.style.display = "none";
});

// ======================
// I WANT 牌互動
// ======================

const spoiledWantSign = document.querySelector(".spoiled-want-hotspot");
const spoiledWantDialogue = document.getElementById("spoiled-want-dialogue");

const spoiledWantDialogues = [
    "Image/I want 1.png",
    "Image/I want 2.png",
    "Image/I want 3.png",
    "Image/I want 4.png",
    "Image/I want 5.png"
];

let spoiledWantDialogueIndex = 0;


// 撳 I WANT 牌
spoiledWantSign.addEventListener("click", function (event) {

    console.log("🔥 I WANT CLICKED");

    event.stopPropagation();

    // 未完成任性企鵝介紹之前，不准撳
    if (!spoiledIntroFinished) return;

    // 入 I WANT 對白後收起「返回地圖」
    spoiledBackMap.style.display = "none";

    // 今次顯示目前嗰一句
    spoiledWantDialogue.src =
        spoiledWantDialogues[spoiledWantDialogueIndex];

    // 隱藏任性領地其他圖片
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {
            item.style.display = "none";
        });

    // 顯示 I WANT 對白
    spoiledWantDialogue.style.display = "block";
});


// 撳對白 → 返出去
spoiledWantDialogue.addEventListener("click", function (event) {

    event.stopPropagation();

    // 收起對白
    spoiledWantDialogue.style.display = "none";

    // 下一次撳牌就顯示下一句
    spoiledWantDialogueIndex++;

    // 第5句之後重新由第1句開始
    if (spoiledWantDialogueIndex >= spoiledWantDialogues.length) {
        spoiledWantDialogueIndex = 0;
    }

    // 顯示返任性領地
    document
        .querySelectorAll(".spoiled-land-container > img")
        .forEach(function (item) {

            // 所有對白圖都唔可以自己彈出
            if (
                !item.classList.contains("spoiled-item-dialogue") &&
                !item.classList.contains("spoiled-random-dialogue") &&
                !item.classList.contains("spoiled-intro") &&
                !item.classList.contains("spoiled-want-dialogue")
            ) {
                item.style.display = "block";
            }

        });

    // 返回領地主畫面後，顯示「返回地圖」
    spoiledBackMap.style.display = "block";

});

// ==============================
// GHOST LAND - SHH INTRO
// ==============================

const ghostShhhHotspot = document.querySelector(".ghost-shhh-hotspot");
const ghostIntro = document.getElementById("ghost-intro");

ghostShhhHotspot.addEventListener("click", function () {

    // 撳咗木牌 → 停止提示發光
    document.querySelector(".ghost-shhh").classList.remove("glowing");

    // 顯示木牌介紹
    ghostIntro.style.display = "block";
});

const ghostIntroImages = [
    "Image/幽靈企鵝領地木牌介紹 1.png",
    "Image/幽靈企鵝領地木牌介紹 2.png",
    "Image/幽靈企鵝領地木牌介紹 3.png",
    "Image/幽靈企鵝領地木牌介紹 4.png",
    "Image/幽靈企鵝領地木牌介紹 5.png",
    "Image/幽靈企鵝領地木牌介紹 6.png",
    "Image/幽靈企鵝領地木牌介紹 7.png"
];

let ghostIntroIndex = 0;

ghostIntro.addEventListener("click", () => {

    ghostIntroIndex++;

    if (ghostIntroIndex < ghostIntroImages.length) {

        // 下一張介紹
        ghostIntro.src = ghostIntroImages[ghostIntroIndex];

    } else {

        // 介紹完畢 → 返回幽靈企鵝領地
        ghostIntro.style.display = "none";

        // reset，之後再撳木牌可以由第一張開始
        ghostIntroIndex = 0;
        ghostIntro.src = ghostIntroImages[0];
    }
});

// ==============================
// GHOST LAND - DOOR KNOCK
// ==============================

const ghostDoorHotspot = document.querySelector(".ghost-door-hotspot");

const ghostHouseStep1 = document.querySelector(".ghost-house-step-1");
const ghostHouseStep2 = document.querySelector(".ghost-house-step-2");
const ghostHouseStep3 = document.querySelector(".ghost-house-step-3");
const ghostHouseStep4 = document.querySelector(".ghost-house-step-4");

const ghostPenguin = document.querySelector(".ghost-penguin");

// 建立信任後：撳幽靈企鵝先出「你返咗嚟」
ghostPenguin.addEventListener("click", () => {

    if (!ghostTrustUnlocked) return;

    ghostReturnDialogue.style.display = "block";

});

let ghostKnockStarted = false;

// 第一次撳石屋門
ghostDoorHotspot.addEventListener("click", () => {

    // 防止不停狂撳
    if (ghostKnockStarted) return;
    ghostKnockStarted = true;

    // 第一次互動正式開始 → 鎖住返回地圖
ghostReturnMap.style.display = "none";

   // 1：KNOCK KNOCK
ghostHouseStep1.style.display = "block";

// 2秒後：KNOCK 消失
setTimeout(() => {
    ghostHouseStep1.style.display = "none";
}, 2000);

// 空白 0.5秒後：「……」出現
setTimeout(() => {
    ghostHouseStep2.style.display = "block";
}, 3000);

// 「……」顯示2秒後消失
setTimeout(() => {
    ghostHouseStep2.style.display = "none";
}, 5000);

// 再空白0.5秒：「再叩一次」出現
setTimeout(() => {
    ghostHouseStep3.style.display = "block";
}, 6000);

   ghostHouseStep3.addEventListener("click", () => {

    ghostHouseStep3.style.display = "none";

    // 先空白0.5秒
    setTimeout(() => {
        ghostHouseStep4.style.display = "block";
    }, 1000);

    // KNOCK 顯示2秒後消失
    setTimeout(() => {
    ghostHouseStep4.style.display = "none";

    // 幽靈企鵝出現
    ghostPenguin.style.display = "block";

    // 企鵝出現1秒後，顯示第一句對白
    setTimeout(() => {
        ghostDialogues[0].style.display = "block";
    }, 1000);

}, 3000);
});
});

// ==============================
// GHOST LAND - FIRST DIALOGUE
// 1.1 → 1.5
// ==============================

ghostDialogues.forEach((dialogue, index) => {

    dialogue.addEventListener("click", () => {

        // 收起目前對白
        dialogue.style.display = "none";

        // 仲有下一句 → 顯示下一句
        if (index < ghostDialogues.length - 1) {

    ghostDialogues[index + 1].style.display = "block";

} else {

    // 1.5 完成 → 第一次互動完成
    ghostFirstVisitFinished = true;
    localStorage.setItem("ghostFirstVisitFinished", "true");

    // 可以返回地圖
    ghostReturnMap.style.display = "block";
}
});

ghostReturnMap.addEventListener("click", () => {

    // ==================================
    // 已建立信任：直接返回地圖
    // ==================================
    if (ghostTrustUnlocked) {

    ghostReturnMap.style.display = "none";

    // 🗺️ 返回地圖 BGM
    switchBgm(beginningBgm);

    ghostLand.classList.add("hidden-land");
    mapScreen.classList.remove("hidden-map");

    return;
}

    // ==================================
    // 第一次探訪：原本離開 sequence
    // ==================================

    // 收起「返回地圖」
    ghostReturnMap.style.display = "none";

    // 出現「……」
    ghostLeaving1.style.display = "block";

    // 「……」顯示 2 秒
    setTimeout(() => {

        // 收起「……」
        ghostLeaving1.style.display = "none";

        // 幽靈企鵝消失
        ghostPenguin.style.display = "none";

        // 再留低空畫面 1 秒
        setTimeout(() => {

        // 🗺️ 返回地圖 BGM
        switchBgm(beginningBgm);

        // 返回地圖
        ghostLand.classList.add("hidden-land");
        mapScreen.classList.remove("hidden-map");

        }, 1000);

    }, 2000);

});


});
// ==============================
// GHOST LAND - SECOND VISIT KNOCK
// 2.1 → 2.5
// ==============================

const ghostSecondSteps = document.querySelectorAll(
    ".ghost-house-second-step"
);

let ghostSecondSequenceStarted = false;

let ghostSecondKnockCount = 0;

ghostDoorHotspot.addEventListener("click", () => {

    console.log("DOOR CLICKED");
    console.log("ghostFirstVisitFinished =", ghostFirstVisitFinished);

    if (!ghostFirstVisitFinished) return;

    // 第一次敲門
    if (ghostSecondKnockCount === 0) {

        ghostSecondKnockCount = 1;

        // 2.1 KNOCK
        ghostSecondSteps[0].style.display = "block";

       // 自動 → 2.2「……」
setTimeout(() => {
    ghostSecondSteps[0].style.display = "none";
    ghostSecondSteps[1].style.display = "block";

    // 「……」2 秒後自己消失
    setTimeout(() => {
        ghostSecondSteps[1].style.display = "none";
    }, 2000);

}, 2000);

        return;
    }

    // 第二次敲門
if (ghostSecondKnockCount === 1) {

    ghostSecondKnockCount = 2;

    // 收起 2.2
    ghostSecondSteps[1].style.display = "none";

    // 2.3 KNOCK
    ghostSecondSteps[2].style.display = "block";

    // 2秒後：KNOCK →「……」
    setTimeout(() => {

        ghostSecondSteps[2].style.display = "none";
        ghostSecondSteps[3].style.display = "block";

        // 「……」停2秒
        setTimeout(() => {

            ghostSecondSteps[3].style.display = "none";

            // 空白1秒
            setTimeout(() => {

                // 2.5 選擇畫面
                ghostSecondSteps[4].style.display = "block";

                document.querySelector(".ghost-choice-back").style.display = "block";
document.querySelector(".ghost-choice-wait").style.display = "block";
            }, 1000);

        }, 2000);

    }, 2000);

    return;
}

});

const ghostChoiceWait = document.querySelector(".ghost-choice-wait");
const ghostChoiceBack = document.querySelector(".ghost-choice-back");
const ghostKnockAgain = document.querySelector(".ghost-knock-again");

// ==================================
// 選擇：返回地圖繼續探索
// ==================================
ghostChoiceBack.addEventListener("click", () => {

    // 收起 2.5 選擇畫面
    ghostSecondSteps[4].style.display = "none";

    // 收起兩個透明 hotspot
    ghostChoiceBack.style.display = "none";
    ghostChoiceWait.style.display = "none";

    // 重設叩門進度
    // 下次返嚟會重新由第一次叩門開始
    ghostSecondKnockCount = 0;

    // 🗺️ 返回地圖 BGM
    switchBgm(beginningBgm);

    // 返回地圖
    ghostLand.classList.add("hidden-land");
    mapScreen.classList.remove("hidden-map");
});

ghostChoiceWait.addEventListener("click", () => {

    // 收起選擇畫面
    ghostSecondSteps[4].style.display = "none";
    ghostChoiceWait.style.display = "none";
    ghostChoiceBack.style.display = "none";

    // 靜靜坐低 3 秒
    setTimeout(() => {

        // 出現「再叩一次」
        ghostKnockAgain.style.display = "block";

    }, 3000);

});

const ghostThirdKnock = document.querySelector(".ghost-third-knock");

const ghostSecondDialogues = document.querySelectorAll(
    ".ghost-second-dialogue"
);

ghostKnockAgain.addEventListener("click", () => {

    // 收起「再叩一次」
    ghostKnockAgain.style.display = "none";

    // 第三次 KNOCK
    ghostThirdKnock.style.display = "block";

    // 2秒後：KNOCK 消失
    setTimeout(() => {

        ghostThirdKnock.style.display = "none";

        // 👻🐧 自己行返出嚟
        ghostPenguin.style.display = "block";

        // 同一刻出現 2.1「……」
        ghostSecondDialogues[0].style.display = "block";

    }, 2000);

});
// ==============================
// GHOST LAND - SECOND VISIT DIALOGUE
// 2.1 → 2.5 逐句 click
// ==============================

ghostSecondDialogues.forEach((dialogue, index) => {

    dialogue.addEventListener("click", () => {

        // 如果已經係最後一句 2.5，就停低
        if (index === ghostSecondDialogues.length - 1) {

    // 收起最後 2.5 表情
    dialogue.style.display = "none";

   // 記錄：幽靈企鵝已經建立信任
ghostTrustUnlocked = true;

// 自動儲存進度
localStorage.setItem("ghostTrustUnlocked", "true");
showSaveIndicator();

    // 顯示「返回地圖」
    ghostReturnMap.style.display = "block";

    return;
}

        // 收起目前一句
        dialogue.style.display = "none";

        // 顯示下一句
        ghostSecondDialogues[index + 1].style.display = "block";

    });

});


// ==============================
// ENTER SECURITY PENGUIN LAND
// ==============================

const securityIcon = document.getElementById("security-icon");
const securityLand = document.getElementById("security-land");

const securityBackMap =
    document.getElementById("security-back-map");

securityBackMap.addEventListener("click", function () {

        // 🗺️ 返回地圖 BGM
    switchBgm(beginningBgm);

    // 如果 Opening 未睇完：
    // 離開時重置，下次入嚟由第 1 張重新開始
    if (!securityIntroFinished) {
        securityOpeningIndex = 0;
        securityOpening.style.display = "none";
        securityOpening.src = securityOpeningImages[0];

        // 清走可能殘留嘅 random speech
        securityRandomSpeechShowing = false;
    }

    securityLand.classList.add("hidden-land");
    mapScreen.classList.remove("hidden-map");
});

const securityPenguin =
    document.querySelector(".security-penguin");

const securityPenguinHotspot =
    document.querySelector(".security-penguin-hotspot");

const securityWatchtower =
    document.querySelector(".security-watchtower");

const securityAlarmRoom =
    document.querySelector(".security-alarm-room");

const securityBorderCheckpoint =
    document.querySelector(".security-border-checkpoint");

let securityIntroFinished =
    localStorage.getItem("securityIntroFinished") === "true";


let securityAlarmRoomFinished = false;
let securityBorderCheckpointFinished = false;
let securityWatchtowerFinished = false;

let securityLandFinished =
    localStorage.getItem("securityLandFinished") === "true";

function checkSecurityLandFinished() {
    if (
        securityAlarmRoomFinished &&
        securityBorderCheckpointFinished &&
        securityWatchtowerFinished &&
        !securityLandFinished
    ) {
        securityLandFinished = true;

        localStorage.setItem("securityLandFinished", "true");

        showSaveIndicator();
    }
}

securityIcon.addEventListener("click", function () {
    if (!mapIntroFinished) return;

        // 🛡️🐧 保安企鵝領地 BGM
    switchBgm(securityBgm);

    mapScreen.classList.add("hidden-map");
    securityLand.classList.remove("hidden-land");

    // 第一次探索：保安企鵝發光
    if (!securityIntroFinished) {
        securityPenguin.classList.add("security-penguin-glow");
    } else {
        securityPenguin.classList.remove("security-penguin-glow");
    }
});

// ==============================
// SECURITY PENGUIN OPENING
// ==============================

const securityOpening =
    document.getElementById("security-opening");

const securityOpeningImages = [
    "Image/保安企鵝 opening 1.png",
    "Image/保安企鵝 opening 2.png",
    "Image/保安企鵝 opening 3.png",
    "Image/保安企鵝 opening 4.png",
    "Image/保安企鵝 opening 5.png",
    "Image/保安企鵝 opening 6.png",
    "Image/保安企鵝 opening 7.png",
    "Image/保安企鵝 opening 8.png",
    "Image/保安企鵝 opening 9.png",
    "Image/保安企鵝 opening 10.png",
    "Image/保安企鵝 opening 11.png",
    "Image/保安企鵝 opening 12.png",
    "Image/保安企鵝 opening 13.png",
    "Image/保安企鵝 opening 14.png",
    "Image/保安企鵝 opening 15.png"
];

let securityOpeningIndex = 0;

const securityRandomSpeechImages = [
    "Image/保安企鵝 random speech 1.png",
    "Image/保安企鵝 random speech 2.png",
    "Image/保安企鵝 random speech 3.png",
    "Image/保安企鵝 random speech 4.png",
    "Image/保安企鵝 random speech 5.png",
    "Image/保安企鵝 random speech 6.png"
];

let securityRandomSpeechShowing = false;


// 撳保安企鵝 → 第一次播放 Opening
securityPenguinHotspot.addEventListener("click", function () {

    // Intro 已完成 → random speech
    if (securityIntroFinished) {

        const randomIndex =
            Math.floor(Math.random() * securityRandomSpeechImages.length);

        securityOpening.src =
            securityRandomSpeechImages[randomIndex];

        securityOpening.style.display = "block";
        securityRandomSpeechShowing = true;

        return;
    }

    // 第一次 → Opening
    securityPenguin.classList.remove("security-penguin-glow");

    securityOpeningIndex = 0;

    securityOpening.src =
        securityOpeningImages[securityOpeningIndex];

    securityOpening.style.display = "block";
});


// Opening 一直撳下一張
securityOpening.addEventListener("click", function () {

    // Random speech → 撳一下直接關閉
    if (securityRandomSpeechShowing) {
        securityOpening.style.display = "none";
        securityRandomSpeechShowing = false;
        return;
    }

    securityOpeningIndex++;
    if (securityOpeningIndex < securityOpeningImages.length) {
        securityOpening.src =
            securityOpeningImages[securityOpeningIndex];
        return;
    }

    // Opening 15 完成
securityOpening.style.display = "none";

securityIntroFinished = true;

localStorage.setItem(
    "securityIntroFinished",
    "true"
);

// 三個區域正式解鎖
securityWatchtower.classList.add("security-item-unlocked");
securityAlarmRoom.classList.add("security-item-unlocked");
securityBorderCheckpoint.classList.add("security-item-unlocked");

showSaveIndicator();
});

// ==============================
// SECURITY ALARM ROOM
// ==============================

const securityAlarmRoomHotspot =
    document.querySelector(".security-alarm-room-hotspot");

const securityAlarmRoomDialogue =
    document.getElementById("security-alarm-room-dialogue");

const securityAlarmRoomImages = [
    "Image/警報控制室 1.png",
    "Image/警報控制室 2.png",
    "Image/警報控制室 3.png",
    "Image/警報控制室 4.png",
    "Image/警報控制室 5.png",
    "Image/警報控制室 6.png",
    "Image/警報控制室 7.png",
    "Image/警報控制室 8.png",
    "Image/警報控制室 9.png",
    "Image/警報控制室 10.png",
    "Image/警報控制室 11.png",
    "Image/警報控制室 12.png",
    "Image/警報控制室 13.png",
    "Image/警報控制室 14.png",
    "Image/警報控制室 15.png",
    "Image/警報控制室 16.png",
    "Image/警報控制室 17.png",
    "Image/警報控制室 18.png"
];

let securityAlarmRoomIndex = 0;


// 撳警報控制室
securityAlarmRoomHotspot.addEventListener("click", function () {

    // 正式開始 item 互動 → 收起保安企鵝 random speech
    securityOpening.style.display = "none";
    securityRandomSpeechShowing = false;

    // Opening 未完成 → 冇反應
    if (!securityIntroFinished) return;

    securityAlarmRoomIndex = 0;

    securityAlarmRoomDialogue.src =
        securityAlarmRoomImages[securityAlarmRoomIndex];

    securityAlarmRoomDialogue.style.display = "block";
});


// 一直撳下一張
securityAlarmRoomDialogue.addEventListener("click", function () {

    securityAlarmRoomIndex++;

    if (securityAlarmRoomIndex < securityAlarmRoomImages.length) {
        securityAlarmRoomDialogue.src =
            securityAlarmRoomImages[securityAlarmRoomIndex];
        return;
    }

    // 18 完成 → 返回領地
securityAlarmRoomFinished = true;
checkSecurityLandFinished();

securityAlarmRoomDialogue.style.display = "none";
});

// ==============================
// SECURITY BORDER CHECKPOINT
// ==============================

const securityBorderCheckpointHotspot =
    document.querySelector(".security-border-checkpoint-hotspot");

const securityBorderCheckpointDialogue =
    document.getElementById("security-border-checkpoint-dialogue");

const securityBorderCheckpointImages = [
    "Image/邊境檢查站 1.png",
    "Image/邊境檢查站 2.png",
    "Image/邊境檢查站 3.png",
    "Image/邊境檢查站 4.png",
    "Image/邊境檢查站 5.png",
    "Image/邊境檢查站 6.png",
    "Image/邊境檢查站 7.png",
    "Image/邊境檢查站 8.png",
    "Image/邊境檢查站 9.png",
    "Image/邊境檢查站 10.png",
    "Image/邊境檢查站 11.png",
    "Image/邊境檢查站 12.png",
    "Image/邊境檢查站 13.png",
    "Image/邊境檢查站 14.png"
];

let securityBorderCheckpointIndex = 0;

securityBorderCheckpointHotspot.addEventListener("click", function () {

    // 正式開始 item 互動 → 收起保安企鵝 random speech
    securityOpening.style.display = "none";
    securityRandomSpeechShowing = false;

    if (!securityIntroFinished) return;

    securityBorderCheckpointIndex = 0;

    securityBorderCheckpointDialogue.src =
        securityBorderCheckpointImages[securityBorderCheckpointIndex];

    securityBorderCheckpointDialogue.style.display = "block";
});

securityBorderCheckpointDialogue.addEventListener("click", function () {
    securityBorderCheckpointIndex++;

    if (
        securityBorderCheckpointIndex <
        securityBorderCheckpointImages.length
    ) {
        securityBorderCheckpointDialogue.src =
            securityBorderCheckpointImages[securityBorderCheckpointIndex];
        return;
    }

    // 14 完成 → 返回領地
securityBorderCheckpointFinished = true;
checkSecurityLandFinished();

securityBorderCheckpointDialogue.style.display = "none";
});

// ==============================
// SECURITY WATCHTOWER
// ==============================

const securityWatchtowerHotspot =
    document.querySelector(".security-watchtower-hotspot");

const securityWatchtowerDialogue =
    document.getElementById("security-watchtower-dialogue");

const securityWatchtowerImages = [
    "Image/瞭望台 1.png",
    "Image/瞭望台 2.png",
    "Image/瞭望台 3.png",
    "Image/瞭望台 4.png",
    "Image/瞭望台 5.png",
    "Image/瞭望台 6.png",
    "Image/瞭望台 7.png",
    "Image/瞭望台 8.png",
    "Image/瞭望台 9.png",
    "Image/瞭望台 10.png",
    "Image/瞭望台 11.png"
];

let securityWatchtowerIndex = 0;

securityWatchtowerHotspot.addEventListener("click", function () {
   
    // 正式開始 item 互動 → 收起保安企鵝 random speech
    securityOpening.style.display = "none";
    securityRandomSpeechShowing = false;

   
    if (!securityIntroFinished) return;

    securityWatchtowerIndex = 0;

    securityWatchtowerDialogue.src =
        securityWatchtowerImages[securityWatchtowerIndex];

    securityWatchtowerDialogue.style.display = "block";
});

securityWatchtowerDialogue.addEventListener("click", function () {
    securityWatchtowerIndex++;

    if (securityWatchtowerIndex < securityWatchtowerImages.length) {
        securityWatchtowerDialogue.src =
            securityWatchtowerImages[securityWatchtowerIndex];
        return;
    }

    // 11 完成 → 返回領地
securityWatchtowerFinished = true;
checkSecurityLandFinished();

securityWatchtowerDialogue.style.display = "none";
});


// ==============================
// ENTER CORNER PENGUIN LAND
// ==============================

const cornerIcon =
    document.getElementById("corner-icon");

const cornerLand =
    document.getElementById("corner-land");

const cornerSofa =
    document.querySelector(".corner-sofa");

const cornerPenguinHotspot =
    document.querySelector(".corner-penguin-hotspot");

const cornerEnding =
    document.getElementById("corner-ending");

let cornerIntroFinished =
    localStorage.getItem("cornerIntroFinished") === "true";

let cornerWindowFinished = false;
let cornerLampFinished = false;
let cornerSecretBoxFinished = false;
let cornerEndingShown = false;

function checkCornerEnding() {
    if (
        cornerWindowFinished &&
        cornerLampFinished &&
        cornerSecretBoxFinished &&
        !cornerEndingShown
    ) {
        cornerEndingShown = true;

        const cornerEnding =
            document.getElementById("corner-ending");

        cornerEnding.style.display = "block";
        localStorage.setItem("cornerLandFinished", "true");
        showSaveIndicator();
    }
}

const cornerIntroDialogue =
    document.getElementById("corner-intro-dialogue");

const cornerIntroImages = [
    "Image/角落企鵝 intro 1.png",
    "Image/角落企鵝 intro 2.png",
    "Image/角落企鵝 intro 3.png",
    "Image/角落企鵝 intro 4.png",
    "Image/角落企鵝 intro 5.png",
    "Image/角落企鵝 intro 6.png",
    "Image/角落企鵝 intro 7.png",
    "Image/角落企鵝 intro 8.png"
];

let cornerIntroIndex = 0;

const cornerRandomSpeech =
    document.getElementById("corner-random-speech");

cornerIcon.addEventListener("click", function () {
    if (!mapIntroFinished) return;

    // 📦🐧 角落企鵝領地 BGM
    switchBgm(cornerBgm);

    mapScreen.classList.add("hidden-map");
    cornerLand.classList.remove("hidden-land");

    // 第一次探索：📦🐧＋梳化發光
    if (!cornerIntroFinished) {
        cornerSofa.classList.add("corner-penguin-glow");
    } else {
        cornerSofa.classList.remove("corner-penguin-glow");
    }
});

cornerPenguinHotspot.addEventListener("click", function () {

    // 領地完成後 → 固定顯示 ending speech
    if (cornerEndingShown) {
        cornerEnding.style.display = "block";
        return;
    }

    // intro 已完成，但領地未完成 → 「正在放空……」
if (cornerIntroFinished) {
    cornerRandomSpeech.style.display = "block";
    return;
}

    // 停止發光
    cornerSofa.classList.remove("corner-penguin-glow");

    // 由 intro 1 開始
    cornerIntroIndex = 0;
    cornerIntroDialogue.src =
        cornerIntroImages[cornerIntroIndex];

    cornerIntroDialogue.style.display = "block";
});

cornerRandomSpeech.addEventListener("click", function () {
    cornerRandomSpeech.style.display = "none";
});

cornerIntroDialogue.addEventListener("click", function () {
    cornerIntroIndex++;

    if (cornerIntroIndex < cornerIntroImages.length) {
        cornerIntroDialogue.src =
            cornerIntroImages[cornerIntroIndex];
        return;
    }

    // intro 完成
    cornerIntroDialogue.style.display = "none";

    cornerIntroFinished = true;
    localStorage.setItem("cornerIntroFinished", "true");

    showSaveIndicator();
});

// ==============================
// CORNER WINDOW
// ==============================

const cornerWindowHotspot =
    document.querySelector(".corner-window-hotspot");

const cornerWindowDialogue =
    document.getElementById("corner-window-dialogue");

const cornerWindowImages = [
    "Image/小窗戶 1.png",
    "Image/小窗戶 2.png",
    "Image/小窗戶 3.png",
    "Image/小窗戶 4.png",
    "Image/小窗戶 5.png",
    "Image/小窗戶 6.png",
    "Image/小窗戶 7.png"
];

let cornerWindowIndex = 0;

cornerWindowHotspot.addEventListener("click", function () {

    // 收起 📦🐧 speech
    cornerRandomSpeech.style.display = "none";
    cornerEnding.style.display = "none";

    // 📦🐧 intro 未完成 → item 鎖住
    if (!cornerIntroFinished) return;

    cornerWindowIndex = 0;

    cornerWindowDialogue.src =
        cornerWindowImages[cornerWindowIndex];

    cornerWindowDialogue.style.display = "block";
});

cornerWindowDialogue.addEventListener("click", function () {
    cornerWindowIndex++;

    if (cornerWindowIndex < cornerWindowImages.length) {
        cornerWindowDialogue.src =
            cornerWindowImages[cornerWindowIndex];
        return;
    }

    // 7 完成 → 返回領地
    cornerWindowDialogue.style.display = "none";
    cornerWindowFinished = true;
checkCornerEnding();
});

// ==============================
// CORNER LAMP
// ==============================

const cornerLampHotspot =
    document.querySelector(".corner-lamp-hotspot");

const cornerLampDialogue =
    document.getElementById("corner-lamp-dialogue");

const cornerLampImages = [
    "Image/暖光小燈 1.png",
    "Image/暖光小燈 2.png",
    "Image/暖光小燈 3.png",
    "Image/暖光小燈 4.png",
    "Image/暖光小燈 5.png",
    "Image/暖光小燈 6.png"
];

let cornerLampIndex = 0;

cornerLampHotspot.addEventListener("click", function () {

        // 收起 📦🐧 speech
    cornerRandomSpeech.style.display = "none";
    cornerEnding.style.display = "none";

    // intro 未完成 → 唔俾探索
    if (!cornerIntroFinished) return;

    cornerLampIndex = 0;

    cornerLampDialogue.src =
        cornerLampImages[cornerLampIndex];

    cornerLampDialogue.style.display = "block";
});

cornerLampDialogue.addEventListener("click", function () {
    cornerLampIndex++;

    if (cornerLampIndex < cornerLampImages.length) {
        cornerLampDialogue.src =
            cornerLampImages[cornerLampIndex];
        return;
    }

    // 6 完成 → 關閉
    cornerLampDialogue.style.display = "none";
    cornerLampFinished = true;
checkCornerEnding();
});

// ==============================
// CORNER SECRET BOX
// ==============================

const cornerSecretBoxHotspot =
    document.querySelector(".corner-secret-box-hotspot");

const cornerSecretBoxDialogue =
    document.getElementById("corner-secret-box-dialogue");

const cornerSecretBoxImages = [
    "Image/秘密小盒子 1.png",
    "Image/秘密小盒子 2.png",
    "Image/秘密小盒子 3.png",
    "Image/秘密小盒子 4.png",
    "Image/秘密小盒子 5.png",
    "Image/秘密小盒子 6.png"
];

let cornerSecretBoxIndex = 0;

cornerSecretBoxHotspot.addEventListener("click", function () {

        // 收起 📦🐧 speech
    cornerRandomSpeech.style.display = "none";
    cornerEnding.style.display = "none";

    // intro 未完成 → 唔俾探索
    if (!cornerIntroFinished) return;

    cornerSecretBoxIndex = 0;

    cornerSecretBoxDialogue.src =
        cornerSecretBoxImages[cornerSecretBoxIndex];

    cornerSecretBoxDialogue.style.display = "block";
});

cornerSecretBoxDialogue.addEventListener("click", function () {
    cornerSecretBoxIndex++;

    if (cornerSecretBoxIndex < cornerSecretBoxImages.length) {
        cornerSecretBoxDialogue.src =
            cornerSecretBoxImages[cornerSecretBoxIndex];
        return;
    }

    // 6 完成 → 關閉
    cornerSecretBoxDialogue.style.display = "none";
    cornerSecretBoxFinished = true;
checkCornerEnding();
cornerEnding.addEventListener("click", function () {
    cornerEnding.style.display = "none";
});
});

// ==============================
// BACK TO MAP
// ==============================

const cornerBackMap =
    document.getElementById("corner-back-map");

cornerBackMap.addEventListener("click", function () {

    // 🗺️ 返回地圖 BGM
    switchBgm(beginningBgm);

    // 如果介紹未完成 → 下次重新由第 1 張開始
    if (!cornerIntroFinished) {
        cornerIntroIndex = 0;

        cornerIntroDialogue.src =
            cornerIntroImages[0];

        cornerIntroDialogue.style.display = "none";

        // 恢復第一次探索時嘅發光狀態
        cornerSofa.classList.remove("corner-penguin-glow");
    }

    cornerLand.classList.add("hidden-land");
    mapScreen.classList.remove("hidden-map");
});

const maskBackMap =
    document.getElementById("mask-back-map");

const maskIcon = document.getElementById("mask-icon");
const maskLand = document.getElementById("mask-land");
const maskPenguin = document.querySelector(".mask-penguin");

const maskPenguinHotspot =
    document.querySelector(".mask-penguin-hotspot");

const maskIntro =
    document.getElementById("mask-intro");

const maskIntroImages = [
    "Image/面具企鵝 intro 1.png",
    "Image/面具企鵝 intro 2.png",
    "Image/面具企鵝 intro 3.png",
    "Image/面具企鵝 intro 4.png",
    "Image/面具企鵝 intro 5.png",
    "Image/面具企鵝 intro 6.png",
    "Image/面具企鵝 intro 7.png",
    "Image/面具企鵝 intro 8.png",
    "Image/面具企鵝 intro 9.png",
    "Image/面具企鵝 intro 10.png",
    "Image/面具企鵝 intro 11.png",
    "Image/面具企鵝 intro 12.png",
    "Image/面具企鵝 intro 13.png",
    "Image/面具企鵝 intro 14.png",
    "Image/面具企鵝 intro 15.png"
];

let maskIntroIndex = 0;

let maskIntroFinished =
    localStorage.getItem("maskIntroFinished") === "true";

    maskIcon.addEventListener("click", function () {
    if (!mapIntroFinished) return;

        // 🎭🐧 面具企鵝領地 BGM
    switchBgm(maskBgm);

    mapScreen.classList.add("hidden-map");
    maskLand.classList.remove("hidden-land");

    // 第一次探索 → 面具企鵝發光
    if (!maskIntroFinished) {
        maskPenguin.classList.add("mask-penguin-glow");
    } else {
        maskPenguin.classList.remove("mask-penguin-glow");
    }
});

const maskRandomSpeechImages = [
    "Image/面具企鵝 random speech 1.png",
    "Image/面具企鵝 random speech 2.png",
    "Image/面具企鵝 random speech 3.png",
    "Image/面具企鵝 random speech 4.png",
    "Image/面具企鵝 random speech 5.png",
    "Image/面具企鵝 random speech 6.png"
];

let maskRandomSpeechShowing = false;

// ==============================
// MASK PENGUIN INTRO
// ==============================

maskPenguinHotspot.addEventListener("click", function () {

    // Intro 已完成 → random speech
    if (maskIntroFinished) {

        const randomIndex =
            Math.floor(Math.random() * maskRandomSpeechImages.length);

        maskIntro.src =
            maskRandomSpeechImages[randomIndex];

        maskIntro.style.display = "block";
        maskRandomSpeechShowing = true;

        return;
    }

    // 第一次 → Intro
    maskPenguin.classList.remove("mask-penguin-glow");

    maskIntroIndex = 0;
    maskIntro.src = maskIntroImages[maskIntroIndex];
    maskIntro.style.display = "block";
});


maskIntro.addEventListener("click", function () {

    // random speech → 撳一下收起
    if (maskRandomSpeechShowing) {
        maskIntro.style.display = "none";
        maskRandomSpeechShowing = false;
        return;
    }

    // 去下一張 intro
    maskIntroIndex++;

    // 仲未睇完 → 顯示下一張
    if (maskIntroIndex < maskIntroImages.length) {
        maskIntro.src = maskIntroImages[maskIntroIndex];
        return;
    }

    // 15 張全部完成
    maskIntro.style.display = "none";

    maskIntroFinished = true;
    localStorage.setItem("maskIntroFinished", "true");

    showSaveIndicator();
});

// ==============================
// MASK WALL
// ==============================

const maskWallHotspot =
    document.querySelector(".mask-wall-hotspot");

const maskWallDialogue =
    document.getElementById("mask-wall-dialogue");

const maskWallImages = [
    "Image/面具牆 1.png",
    "Image/面具牆 2.png",
    "Image/面具牆 3.png",
    "Image/面具牆 4.png",
    "Image/面具牆 5.png",
    "Image/面具牆 6.png",
    "Image/面具牆 7.png"
];

let maskWallIndex = 0;
let maskWallFinished = false;


// 撳面具牆
maskWallHotspot.addEventListener("click", function () {

    // 未睇完 intro → 唔准探索
    if (!maskIntroFinished) return;

    maskWallIndex = 0;

    maskWallDialogue.src =
        maskWallImages[maskWallIndex];

    maskWallDialogue.style.display = "block";
});


// 一直撳下一張
maskWallDialogue.addEventListener("click", function () {

    maskWallIndex++;

    if (maskWallIndex < maskWallImages.length) {

        maskWallDialogue.src =
            maskWallImages[maskWallIndex];

        return;
    }

    // 第 7 張完成 → 返回領地
    maskWallDialogue.style.display = "none";
    maskWallFinished = true;
    checkMaskLandFinished();
});

// ==============================
// DRESSING MIRROR
// ==============================

const maskDressingMirrorHotspot =
    document.querySelector(".mask-dressing-mirror-hotspot");

const maskDressingMirrorDialogue =
    document.getElementById("mask-dressing-mirror-dialogue");

const maskDressingMirrorImages = [
    "Image/換裝鏡 1.png",
    "Image/換裝鏡 2.png",
    "Image/換裝鏡 3.png",
    "Image/換裝鏡 4.png",
    "Image/換裝鏡 5.png",
    "Image/換裝鏡 6.png",
    "Image/換裝鏡 7.png",
    "Image/換裝鏡 8.png"
];

let maskDressingMirrorIndex = 0;
let maskMirrorFinished = false;


// 撳換裝鏡
maskDressingMirrorHotspot.addEventListener("click", function () {

    // 未睇完 intro → 唔准探索
    if (!maskIntroFinished) return;

    maskDressingMirrorIndex = 0;

    maskDressingMirrorDialogue.src =
        maskDressingMirrorImages[maskDressingMirrorIndex];

    maskDressingMirrorDialogue.style.display = "block";
});


// 一直撳下一張
maskDressingMirrorDialogue.addEventListener("click", function () {

    maskDressingMirrorIndex++;

    if (maskDressingMirrorIndex < maskDressingMirrorImages.length) {

        maskDressingMirrorDialogue.src =
            maskDressingMirrorImages[maskDressingMirrorIndex];

        return;
    }

    // 第 8 張完成 → 返回領地
    maskDressingMirrorDialogue.style.display = "none";
    maskMirrorFinished = true;
    checkMaskLandFinished();
});

// ==============================
// REHEARSAL AREA
// ==============================

const maskRehearsalHotspot =
    document.querySelector(".mask-rehearsal-hotspot");

const maskRehearsalDialogue =
    document.getElementById("mask-rehearsal-dialogue");

const maskRehearsalAnswerA =
    document.querySelector(".mask-rehearsal-answer-a");

const maskRehearsalAnswerB =
    document.querySelector(".mask-rehearsal-answer-b");

const maskRehearsalAnswerC =
    document.querySelector(".mask-rehearsal-answer-c");


const maskRehearsalMainImages = [
    "Image/彩排區 1.png",
    "Image/彩排區 2.png",
    "Image/彩排區 3.png",
    "Image/彩排區 4.png",
    "Image/彩排區 5.png",
    "Image/彩排區 6.png",
    "Image/彩排區 7.png"
];

let maskRehearsalIndex = 0;
let maskRehearsalWaitingForAnswer = false;
let maskRehearsalBranchPlaying = false;
let maskRehearsalFinished = false;

function checkMaskLandFinished() {
    if (
        maskWallFinished &&
        maskMirrorFinished &&
        maskRehearsalFinished
    ) {
        localStorage.setItem("maskLandFinished", "true");
        showSaveIndicator();
    }
}

// 撳彩排區
maskRehearsalHotspot.addEventListener("click", function () {

    // 未完成 intro → 唔准探索
    if (!maskIntroFinished) return;

    maskRehearsalIndex = 0;
    maskRehearsalWaitingForAnswer = false;

    maskRehearsalDialogue.src =
        maskRehearsalMainImages[maskRehearsalIndex];

    maskRehearsalDialogue.style.display = "block";
});


// 彩排區 1 → 7
maskRehearsalDialogue.addEventListener("click", function (event) {
    event.stopPropagation();

    // 正在播放 A / B / C branch 時，主流程完全唔郁
    if (maskRehearsalBranchPlaying) return;

    // 已經去到彩排區 7 → 等答案
    if (maskRehearsalWaitingForAnswer) {
        return;
    }

    // 如果而家已經係第 7 張
    if (maskRehearsalIndex === 6) {
        maskRehearsalWaitingForAnswer = true;

        maskRehearsalAnswerA.style.display = "block";
        maskRehearsalAnswerB.style.display = "block";
        maskRehearsalAnswerC.style.display = "block";

        return;
    }

    // 下一張
    maskRehearsalIndex++;

    maskRehearsalDialogue.src =
        maskRehearsalMainImages[maskRehearsalIndex];

    // 剛剛進入第 7 張
    if (maskRehearsalIndex === 6) {
        maskRehearsalWaitingForAnswer = true;

        maskRehearsalAnswerA.style.display = "block";
        maskRehearsalAnswerB.style.display = "block";
        maskRehearsalAnswerC.style.display = "block";
    }
});

// ==============================
// 彩排區答案 A / B / C
// ==============================

function startMaskRehearsalBranch(images) {
    maskRehearsalBranchPlaying = true;

    // 收起三個答案 hotspot
    maskRehearsalAnswerA.style.display = "none";
    maskRehearsalAnswerB.style.display = "none";
    maskRehearsalAnswerC.style.display = "none";

    maskRehearsalWaitingForAnswer = false;

    let branchIndex = 0;

    // 顯示 branch 第一張
    maskRehearsalDialogue.src = images[branchIndex];

    function nextBranchImage(event) {
        event.stopPropagation();

        branchIndex++;

        if (branchIndex < images.length) {
            maskRehearsalDialogue.src = images[branchIndex];
            return;
        }

        // branch 完成 → 關閉 → 返回領地
        maskRehearsalDialogue.style.display = "none";
        maskRehearsalBranchPlaying = false;
        maskRehearsalFinished = true;
        checkMaskLandFinished();

        maskRehearsalDialogue.removeEventListener(
            "click",
            nextBranchImage
        );
    }

    maskRehearsalDialogue.addEventListener(
        "click",
        nextBranchImage
    );
}


// A
maskRehearsalAnswerA.addEventListener("click", function (event) {
    event.stopPropagation();

    if (maskRehearsalBranchPlaying) return;

    startMaskRehearsalBranch([
        "Image/彩排區 A.1.png",
        "Image/彩排區 A.2.png"
    ]);
});


// B
maskRehearsalAnswerB.addEventListener("click", function (event) {
    event.stopPropagation();

    if (maskRehearsalBranchPlaying) return;

    startMaskRehearsalBranch([
        "Image/彩排區 B.1.png",
        "Image/彩排區 B.2.png",
        "Image/彩排區 B.3.png",
        "Image/彩排區 B.4.png"
    ]);
});


// C
maskRehearsalAnswerC.addEventListener("click", function (event) {
    event.stopPropagation();

if (maskRehearsalBranchPlaying) return;

    startMaskRehearsalBranch([
        "Image/彩排區 C.1.png",
        "Image/彩排區 C.2.png",
        "Image/彩排區 C.3.png",
        "Image/彩排區 C.4.png"
    ]);
});

// ==============================
// MASK LAND - BACK TO MAP
// ==============================

maskBackMap.addEventListener("click", function () {

    console.log("MASK BACK BUTTON CLICKED");

    // 🗺️ 返回地圖 BGM
    switchBgm(beginningBgm);

    // 如果介紹未睇完 → 重置
    // 下次入嚟由 intro 1 重新開始
    if (!maskIntroFinished) {
        maskIntroIndex = 0;

        maskIntro.style.display = "none";
        maskIntro.src = maskIntroImages[0];

        // 清走企鵝發光
        maskPenguin.classList.remove("mask-penguin-glow");
    }

    maskLand.classList.add("hidden-land");
    mapScreen.classList.remove("hidden-map");
});





const beginningBgm = document.getElementById("beginning-bgm");
const spoiledBgm = document.getElementById("spoiled-bgm");
const ghostBgm = document.getElementById("ghost-bgm");
const researcherBgm = document.getElementById("researcher-bgm");
const cornerBgm = document.getElementById("corner-bgm");
const securityBgm = document.getElementById("security-bgm");
const darkBgm = document.getElementById("dark-bgm");
const maskBgm = document.getElementById("mask-bgm");
const councilBgm = document.getElementById("council-bgm");

function switchBgm(bgm) {
   const allBgm = [
    beginningBgm,
    spoiledBgm,
    ghostBgm,
    researcherBgm,
    cornerBgm,
    securityBgm,
    darkBgm,
    maskBgm,
    councilBgm
];

    allBgm.forEach(function (audio) {
        if (audio !== bgm) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    if (bgm.paused) {
        bgm.currentTime = 0;

        bgm.play().catch(function (error) {
            console.log("BGM 播放失敗：", error);
        });
    }
}

// =====================================================
// PENGUIN WORLD PRELOADER - STAGE 1
// =====================================================

const loadingScreen = document.getElementById("loading-screen");
const loadingBarFill = document.getElementById("loading-bar-fill");
const loadingPercentage = document.getElementById("loading-percentage");
const loadingMessage = document.getElementById("loading-message");

const loadingMessages = [
    "⋯⋯企鵝世界？邊度嚟㗎？",
    "請帶好你嘅行裝⋯⋯",
    "之前啲訪客好似唔俾入⋯⋯",
    "聽講入面住咗好多企鵝⋯⋯",
    "唔知今次俾唔俾入呢⋯⋯",
    "前面好似有一道門⋯⋯",
    "記得保管好你嘅通行證⋯⋯",
    "聽講呢度唔係個個都搵得到⋯⋯",
    "目的地好似愈嚟愈近啦⋯⋯"
];

let loadingMessageTimer = null;


// ==============================
// Random loading message
// ==============================

function startLoadingMessages() {

    loadingMessageTimer = setInterval(function () {

        const randomIndex =
            Math.floor(Math.random() * loadingMessages.length);

        loadingMessage.style.opacity = "0";

        setTimeout(function () {
            loadingMessage.textContent =
                loadingMessages[randomIndex];

            loadingMessage.style.opacity = "0.8";
        }, 300);

    }, 4500);
}


// ==============================
// Council assets = Stage 2
// ==============================

function isCouncilAsset(path) {

    return (
        path.includes("Image/企鵝議會廳 1.png") ||
        path.includes("Image/企鵝議會廳 2.png") ||
        path.includes("Image/企鵝議會廳 坐低 button.png") ||
        /Image\/結語 \d+\.png/.test(path) ||
        path.includes("Image/獨白 Video.mp4") ||
        path.includes("Audio/議會廳.mp3")
    );
}


// ==============================
// Find assets used by the game
// ==============================

async function collectStage1Assets() {

    const assets = new Set();


    // ----- Assets already written in HTML -----

    document
        .querySelectorAll("img[src], audio source[src]")
        .forEach(function (element) {

            const src = element.getAttribute("src");

            if (
                src &&
                !isCouncilAsset(src)
            ) {
                assets.add(src);
            }

        });


    // ----- Assets referenced inside script.js -----

    try {

        const response = await fetch("script.js", {
            cache: "force-cache"
        });

        const scriptText = await response.text();

        const assetRegex =
            /(?:Image|Audio)\/[^"'`<>\n]+?\.(?:png|jpg|jpeg|webp|mp3)/gi;

        const matches =
            scriptText.match(assetRegex) || [];

        matches.forEach(function (path) {

            if (
                !path.includes("${") &&
                !isCouncilAsset(path)
            ) {
                assets.add(path);
            }

        });

    } catch (error) {

        console.warn(
            "Could not scan script.js for preload assets:",
            error
        );
    }


    // ==============================
    // Dark Penguin Shadow Mirror
    // dynamically generated filenames
    // ==============================

    // 1–35
    for (let i = 1; i <= 35; i++) {
        assets.add(`Image/暗影鏡 ${i}.png`);
    }

    // 36–46 : Record 1
    for (let i = 1; i <= 11; i++) {

        const number = 35 + i;

        assets.add(
            `Image/暗影鏡 ${number} Record 1.${i}.png`
        );
    }

    // 47–62 : Record 2
    for (let i = 1; i <= 16; i++) {

        const number = 46 + i;

        assets.add(
            `Image/暗影鏡 ${number} Record 2.${i}.png`
        );
    }

    // 63–81 : Record 3
    for (let i = 1; i <= 19; i++) {

        const number = 62 + i;

        assets.add(
            `Image/暗影鏡 ${number} Record 3.${i}.png`
        );
    }

    // 82–89
    for (let i = 82; i <= 89; i++) {
        assets.add(`Image/暗影鏡 ${i}.png`);
    }


    return Array.from(assets);
}


// ==============================
// Load one asset
// ==============================

async function preloadOneAsset(url) {

    try {

        const response = await fetch(url, {
            cache: "force-cache"
        });

        if (!response.ok) {
            console.warn("Preload failed:", url);
        }

        // Important:
        // consume the file so it is actually downloaded
        await response.blob();

    } catch (error) {

        console.warn("Preload error:", url);

    }
}


// ==============================
// Stage 1 preload
// ==============================

async function startStage1Preload() {

    startLoadingMessages();

    const assets =
        await collectStage1Assets();

    console.log(
        "🐧 Stage 1 assets:",
        assets.length
    );

    let loaded = 0;

    function updateProgress() {

        loaded++;

        const percent =
            Math.round(
                (loaded / assets.length) * 100
            );

        loadingBarFill.style.width =
            percent + "%";

        loadingPercentage.textContent =
            percent + "%";
    }


    // Limit simultaneous downloads
    // so slower Wi-Fi does not get overwhelmed

    const queue = [...assets];

    const workers = [];

    const workerCount = 6;


    async function worker() {

        while (queue.length > 0) {

            const url = queue.shift();

            await preloadOneAsset(url);

            updateProgress();
        }
    }


    for (let i = 0; i < workerCount; i++) {
        workers.push(worker());
    }


    await Promise.all(workers);


    // ==============================
    // Finished!
    // ==============================

    clearInterval(loadingMessageTimer);

    loadingBarFill.style.width = "100%";
    loadingPercentage.textContent = "100%";

    loadingMessage.style.opacity = "0";

    setTimeout(function () {

        loadingMessage.textContent =
            "到達企鵝世界啦！🐧";

        loadingMessage.style.opacity = "0.8";

    }, 300);


    setTimeout(function () {

        loadingScreen.classList.add(
            "loading-finished"
        );

    }, 1000);


    setTimeout(function () {

        loadingScreen.style.display = "none";

    }, 1700);
}


// START
startStage1Preload();