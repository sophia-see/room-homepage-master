let heroContainer = document.getElementById("hero__background");
let mobileMenu = document.getElementById("mobile_menu__container");
let aboutImgDark = document.getElementById("about__img_dark");
let aboutImgLight = document.getElementById("about__img_light");
let beforeStyle = window.getComputedStyle(heroContainer, "::before");

function generateNewImage ({isNewIndex, isMobile, action})  {
    const currentRoom = beforeStyle.getPropertyValue("background-image");
    const imgFullName = currentRoom.split("/");
    const imgPaths = imgFullName.slice(0, imgFullName.length-1);
    const imgName = imgFullName.pop();

    const filePath = imgPaths.slice(3).join("/");

    let strArr = imgName.split("-");
    let imgBaseName = strArr.slice(0,3).join("-");
    let currNumStr = strArr[3].split(".")[0];
    let imgFileType = strArr[3].split(".")[1].replace("\")","");
    let currNum = parseInt(currNumStr);


    let decNum = currNum-1;
    let prevNum =  decNum > 0 ? decNum : decNum + 3;
    let nextNum = ((currNum) % 3) + 1;

    let imgIndex = currNum;

    if (action && isNewIndex) {
        imgIndex = action == "next" ? nextNum : prevNum;
    }

    let newImgName = `${filePath}/${imgBaseName}-${imgIndex}.${imgFileType}`;
    let finalImgName = changeImgSize({imgName: newImgName, isMobile})

    return finalImgName;
}

function changeImgSize ({imgName, isMobile}) {
    return isMobile ? imgName.replace("desktop", "mobile") : imgName.replace("mobile", "desktop")
}

function changeImage ({action}) {
    let isMobile = isDeviceMobile();
    let newImgName = generateNewImage({isNewIndex: true, isMobile, action})

    return newImgName;
}

function isDeviceMobile () {
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    let isMobile = vw <= 1024;

    return isMobile;
}

function handleResize() {
    let isMobile = isDeviceMobile();

    let newImgName = generateNewImage({isNewIndex: false, isMobile, undefined});

    heroContainer.style.setProperty("--before-bg", `url(${newImgName})`);
}

window.addEventListener('resize', handleResize);

document.getElementById("hero__control-left").addEventListener("click", () => {
    let newImgName = changeImage({action: "back"})

    heroContainer.style.setProperty("--before-bg", `url(${newImgName})`);
})

document.getElementById("hero__control-right").addEventListener("click", () => {
    let newImgName = changeImage({action: "next"})

    heroContainer.style.setProperty("--before-bg", `url(${newImgName})`);
})

document.getElementById("header__menu").addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    document.body.classList.add('no-scroll'); // Disable scrolling
})

document.getElementById("mobile__menu__close_btn").addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    document.body.classList.remove('no-scroll'); // Disable scrolling
})