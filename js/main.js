const allBosses = [
    { name: "시그너스", difficulty: "easy", order: 1, img: "images/cignus_easy.png" },
    { name: "힐라", difficulty: "hard", order: 2, img: "images/hilla_hard.png" },
    { name: "핑크빈", difficulty: "chaos", order: 3, img: "images/pinkbean_chaos.png" },
    { name: "시그너스", difficulty: "normal", order: 4, img: "images/cignus_normal.png" },
    { name: "자쿰", difficulty: "chaos", order: 5, img: "images/zakum_chaos.png" },
    { name: "피에르", difficulty: "chaos", order: 6, img: "images/pierre_chaos.png" },
    { name: "반반", difficulty: "chaos", order: 7, img: "images/banban_chaos.png" },
    { name: "블러드퀸", difficulty: "chaos", order: 8, img: "images/queen_chaos.png" },
    { name: "노히메", difficulty: "normal", order: 9, img: "images/princess_normal.png" },
    { name: "벨룸", difficulty: "chaos", order: 10, img: "images/vellum_chaos.png" },
    { name: "매그너스", difficulty: "hard", order: 11, img: "images/magnus_hard.png" },
    { name: "파풀라투스", difficulty: "chaos", order: 12, img: "images/papulatus_chaos.png" },
    { name: "스우", difficulty: "normal", order: 13, img: "images/lotus_normal.png" },
    { name: "데미안", difficulty: "normal", order: 14, img: "images/damien_normal.png" },
    { name: "아케치", difficulty: "normal", order: 15, img: "images/akechi_normal.png" },
    { name: "루시드", difficulty: "easy", order: 16, img: "images/lucid_easy.png" },
    { name: "윌", difficulty: "easy", order: 17, img: "images/will_easy.png" },
    { name: "가엔슬", difficulty: "normal", order: 18, img: "images/slime_normal.png" },
    { name: "루시드", difficulty: "normal", order: 19, img: "images/lucid_normal.png" },
    { name: "윌", difficulty: "normal", order: 20, img: "images/will_normal.png" },
    { name: "더스크", difficulty: "normal", order: 21, img: "images/gloom_normal.png" },
    { name: "듄켈", difficulty: "normal", order: 22, img: "images/darnell_normal.png" },
    { name: "스우", difficulty: "hard", order: 23, img: "images/lotus_hard.png" },
    { name: "데미안", difficulty: "hard", order: 24, img: "images/damien_hard.png" },
    { name: "루시드", difficulty: "hard", order: 25, img: "images/lucid_hard.png" },
    { name: "윌", difficulty: "hard", order: 26, img: "images/will_hard.png" },
    { name: "가엔슬", difficulty: "chaos", order: 27, img: "images/slime_chaos.png" },
    { name: "진힐라", difficulty: "normal", order: 28, img: "images/jinhilla_normal.png" },
    { name: "더스크", difficulty: "chaos", order: 29, img: "images/gloom_chaos.png" },
    { name: "듄켈", difficulty: "hard", order: 30, img: "images/darnell_hard.png" },
    { name: "진힐라", difficulty: "hard", order: 31, img: "images/jinhilla_hard.png" },
    { name: "세렌", difficulty: "normal", order: 32, img: "images/seren_normal.png" },
    { name: "칼로스", difficulty: "easy", order: 33, img: "images/kalos_easy.png" },
    { name: "세렌", difficulty: "hard", order: 34, img: "images/seren_hard.png" },
    { name: "카링", difficulty: "easy", order: 35, img: "images/kaling_easy.png" },
    { name: "칼로스", difficulty: "normal", order: 36, img: "images/kalos_normal.png" },
    { name: "스우", difficulty: "extreme", order: 37, img: "images/lotus_extreme.png" },
    { name: "카링", difficulty: "normal", order: 38, img: "images/kaling_normal.png" },
    { name: "림보", difficulty: "normal", order: 39, img: "images/limbo_normal.png" },
    { name: "칼로스", difficulty: "chaos", order: 40, img: "images/kalos_chaos.png" },
    { name: "카링", difficulty: "hard", order: 41, img: "images/kaling_hard.png" },
    { name: "세렌", difficulty: "extreme", order: 42, img: "images/seren_extreme.png" },
    { name: "림보", difficulty: "hard", order: 43, img: "images/limbo_hard.png" },
    { name: "칼로스", difficulty: "extreme", order: 44, img: "images/kalos_extreme.png" },
    { name: "카링", difficulty: "extreme", order: 45, img: "images/kaling_extreme.png" },
];

const dailyTasks = [
    { name: "몬스터파크", order: 1 },
    { name: "일일 퀘스트", order: 2 }
];

const weeklyTasks = [
    { name: "수로", order: 1 },
    { name: "플래그", order: 2 },
    { name: "익몬", order: 3 },
    { name: "헤영지", order: 4 },
    { name: "앵컴", order: 5 },
    { name: "하이마운틴", order: 6 }
];

let characters = JSON.parse(localStorage.getItem("characters")) || [];

// === 캐릭터 관리 ===
function addCharacter() {
    const name = prompt("추가할 캐릭터 이름:");
    if (name && !characters.includes(name)) {
        characters.push(name);
        localStorage.setItem("characters", JSON.stringify(characters));
        localStorage.setItem(`${name}_bosses`, JSON.stringify([]));
        localStorage.setItem(`${name}_dailyTasks`, JSON.stringify([]));
        localStorage.setItem(`${name}_weeklyTasks`, JSON.stringify([]));
        renderCharacters();
    }
}

function removeCharacter(name) {
    if (!confirm(`${name} 캐릭터를 삭제하시겠습니까?`)) return;
    characters = characters.filter(c => c !== name);
    localStorage.setItem("characters", JSON.stringify(characters));
    localStorage.removeItem(`${name}_bosses`);
    localStorage.removeItem(`${name}_dailyTasks`);
    localStorage.removeItem(`${name}_weeklyTasks`);
    renderCharacters();
}

// === 모달 생성 ===
function createModal(titleText, contentBuilder) {
    const modal = document.createElement("div");
    modal.className = "modal";
    const box = document.createElement("div");
    box.className = "modal-box";

    const title = document.createElement("h3");
    title.textContent = titleText;
    box.appendChild(title);

    contentBuilder(box);

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "닫기";
    closeBtn.className = "remove-btn";
    closeBtn.onclick = () => document.body.removeChild(modal);

    const buttons = document.createElement("div");
    buttons.className = "modal-buttons";
    buttons.appendChild(closeBtn);
    box.appendChild(buttons);

    modal.appendChild(box);
    document.body.appendChild(modal);

    // 모달 바깥 클릭 시 닫기
    modal.addEventListener("click", (e) => {
        if (e.target === modal) document.body.removeChild(modal);
    });
}

// === 보스 추가 모달 ===
function addBoss(char) {
    createModal("보스 추가", (box) => {
        const bossList = JSON.parse(localStorage.getItem(`${char}_bosses`) || '[]');
        allBosses.forEach(b => {
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.alignItems = "center";
            wrapper.style.justifyContent = "space-between";

            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            const bossKey = `${b.name}_${b.difficulty}`;
            checkbox.checked = bossList.includes(bossKey);

            checkbox.addEventListener("change", () => {
                let list = JSON.parse(localStorage.getItem(`${char}_bosses`) || '[]');
                if (checkbox.checked) {
                    if (!list.includes(bossKey)) list.push(bossKey);
                } else {
                    list = list.filter(k => k !== bossKey);
                }
                localStorage.setItem(`${char}_bosses`, JSON.stringify(list));
                renderCharacters();
            });

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(`${b.name} (${b.difficulty})`));
            wrapper.appendChild(label);
            box.appendChild(wrapper);
        });
    });
}

// === 일일/주간 숙제 추가 모달 ===
function addTask(char, taskList, type) {
    createModal(type + " 추가", (box) => {
        const storageKey = type === "일일숙제" ? `${char}_dailyTasks` : `${char}_weeklyTasks`;
        const addedTasks = JSON.parse(localStorage.getItem(storageKey) || '[]');

        taskList.forEach(task => {
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.alignItems = "center";
            wrapper.style.justifyContent = "space-between";

            const label = document.createElement("label");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            const taskKey = task.name;
            checkbox.checked = addedTasks.includes(taskKey);

            checkbox.addEventListener("change", () => {
                let list = JSON.parse(localStorage.getItem(storageKey) || '[]');
                if (checkbox.checked) {
                    if (!list.includes(taskKey)) list.push(taskKey);
                } else {
                    list = list.filter(k => k !== taskKey);
                }
                localStorage.setItem(storageKey, JSON.stringify(list));
                renderCharacters();
            });

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(task.name));
            wrapper.appendChild(label);
            box.appendChild(wrapper);
        });
    });
}

// === 전체 체크/해제 ===
function checkAll(type) {
    characters.forEach(char => {
        if(type === "all") {
            const bossList = JSON.parse(localStorage.getItem(`${char}_bosses`) || '[]');
            bossList.forEach(bossKey => localStorage.setItem(`${char}_${bossKey}`, "true"));

            const dailyList = JSON.parse(localStorage.getItem(`${char}_dailyTasks`) || '[]');
            dailyList.forEach(task => localStorage.setItem(`${char}_daily_${task}`, "true"));

            const weeklyList = JSON.parse(localStorage.getItem(`${char}_weeklyTasks`) || '[]');
            weeklyList.forEach(task => localStorage.setItem(`${char}_weekly_${task}`, "true"));
        }
    });
    renderCharacters();
}

function uncheckAll(type) {
    characters.forEach(char => {
        if(type === "all") {
            const bossList = JSON.parse(localStorage.getItem(`${char}_bosses`) || '[]');
            bossList.forEach(bossKey => localStorage.setItem(`${char}_${bossKey}`, "false"));

            const dailyList = JSON.parse(localStorage.getItem(`${char}_dailyTasks`) || '[]');
            dailyList.forEach(task => localStorage.setItem(`${char}_daily_${task}`, "false"));

            const weeklyList = JSON.parse(localStorage.getItem(`${char}_weeklyTasks`) || '[]');
            weeklyList.forEach(task => localStorage.setItem(`${char}_weekly_${task}`, "false"));
        }
    });
    renderCharacters();
}

// 일일숙제 체크 해제
document.getElementById("uncheckDailyBtn").addEventListener("click", () => {
    characters.forEach(char => {
        const dailyList = JSON.parse(localStorage.getItem(`${char}_dailyTasks`) || '[]');
        dailyList.forEach(taskName => {
            localStorage.setItem(`${char}_daily_${taskName}`, "false");
        });
    });
    renderCharacters();
});

// 전체 체크/해제 버튼
document.getElementById("checkAllBtn").addEventListener("click", () => checkAll("all"));
document.getElementById("uncheckAllBtn").addEventListener("click", () => uncheckAll("all"));

// === 렌더링 ===
function renderCharacters() {
    const container = document.getElementById("characters");
    container.innerHTML = "";

    characters.forEach(char => {
        const charDiv = document.createElement("div");
        charDiv.className = "character";

        const title = document.createElement("h2");
        title.innerHTML = `${char} <span>
            <button class="remove-btn" onclick="removeCharacter('${char}')">캐릭터 삭제</button>
            <button class="add-btn" onclick="addBoss('${char}')">보스 추가</button>
            <button class="add-btn" onclick="addTask('${char}', dailyTasks, '일일숙제')">일일숙제 추가</button>
            <button class="add-btn" onclick="addTask('${char}', weeklyTasks, '주간숙제')">주간숙제 추가</button>
        </span>`;
        charDiv.appendChild(title);

        const bossListDiv = document.createElement("div");
        bossListDiv.className = "boss-list";

        // 로컬스토리지에서 가져온 보스 리스트를 order 기준으로 정렬
        const bossList = JSON.parse(localStorage.getItem(`${char}_bosses`) || '[]')
            .map(key => allBosses.find(b => `${b.name}_${b.difficulty}` === key))
            .filter(b => b)
            .sort((a, b) => a.order - b.order);

        bossList.forEach(boss => {
            const wrapper = document.createElement("div");
            wrapper.className = "boss-wrapper";

            const img = document.createElement("img");
            img.src = boss.img;
            img.title = `${boss.name} (${boss.difficulty})`;

            const checkMark = document.createElement("span");
            checkMark.className = "checkmark";
            checkMark.textContent = "✔";

            if (localStorage.getItem(`${char}_${boss.name}_${boss.difficulty}`) === "true") {
                img.classList.add("checked");
                checkMark.style.display = "block";
            }

            img.addEventListener("click", () => {
                const current = localStorage.getItem(`${char}_${boss.name}_${boss.difficulty}`) === "true";
                localStorage.setItem(`${char}_${boss.name}_${boss.difficulty}`, !current);
                img.classList.toggle("checked");
                checkMark.style.display = current ? "none" : "block";
            });

            wrapper.appendChild(img);
            wrapper.appendChild(checkMark);
            bossListDiv.appendChild(wrapper);
        });

        charDiv.appendChild(bossListDiv);

        const taskWrapper = document.createElement("div");
        taskWrapper.style.display = "flex";
        taskWrapper.style.gap = "40px";
        taskWrapper.style.marginTop = "12px";

        // === 일일숙제 ===
        const dailyDiv = document.createElement("div");
        dailyDiv.className = "task-list horizontal";
        const dailyTitle = document.createElement("h3");
        dailyTitle.textContent = "일일숙제";
        dailyDiv.appendChild(dailyTitle);
        const dailyAdded = JSON.parse(localStorage.getItem(`${char}_dailyTasks`) || '[]');

        dailyAdded.forEach(taskName => {
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.alignItems = "center";
            wrapper.style.gap = "6px";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            if (localStorage.getItem(`${char}_daily_${taskName}`) === "true") {
                checkbox.checked = true;
            }

            checkbox.addEventListener("change", () => {
                localStorage.setItem(`${char}_daily_${taskName}`, checkbox.checked ? "true" : "false");
            });

            wrapper.appendChild(checkbox);
            wrapper.appendChild(document.createTextNode(taskName));
            dailyDiv.appendChild(wrapper);
        });

        // === 주간숙제 ===
        const weeklyDiv = document.createElement("div");
        weeklyDiv.className = "task-list horizontal";
        const weeklyTitle = document.createElement("h3");
        weeklyTitle.textContent = "주간숙제";
        weeklyDiv.appendChild(weeklyTitle);
        const weeklyAdded = JSON.parse(localStorage.getItem(`${char}_weeklyTasks`) || '[]');

        weeklyAdded.forEach(taskName => {
            const wrapper = document.createElement("div");
            wrapper.style.display = "flex";
            wrapper.style.alignItems = "center";
            wrapper.style.gap = "6px";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            if (localStorage.getItem(`${char}_weekly_${taskName}`) === "true") {
                checkbox.checked = true;
            }

            checkbox.addEventListener("change", () => {
                localStorage.setItem(`${char}_weekly_${taskName}`, checkbox.checked ? "true" : "false");
            });

            wrapper.appendChild(checkbox);
            wrapper.appendChild(document.createTextNode(taskName));
            weeklyDiv.appendChild(wrapper);
        });

        taskWrapper.appendChild(dailyDiv);
        taskWrapper.appendChild(weeklyDiv);
        charDiv.appendChild(taskWrapper);

        container.appendChild(charDiv);
    });
}

// === 초기 렌더 ===
document.getElementById("addCharBtn").addEventListener("click", addCharacter);
renderCharacters();
