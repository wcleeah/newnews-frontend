const keywordList = new Set();
const keywordContainer = document.querySelector("div.keyword-container");
const addKeywordContainer = document.querySelector("div.add-keyword-container");
const addKeywordButton = document.getElementById("add-keyword-button");
const addKeywordTextbox = document.getElementById("add-keyword-textbox");

function handleAddKeyword() {
    const keyword = addKeywordTextbox.value;
    if (!keyword) {
        return;
    }

    if (keywordList.has(keyword)) {
        return;
    }
    keywordList.add(keyword);

    const keywordNode = document.createElement("div");
    keywordNode.textContent = keyword;
    keywordNode.className = "keyword";
    keywordContainer.appendChild(keywordNode);

    const delButtonNode = document.createElement("input");
    delButtonNode.value = "Delete";
    delButtonNode.className = "del-button";
    delButtonNode.type = "button"
    keywordContainer.appendChild(delButtonNode);
    delButtonNode.addEventListener("click", function () {
        keywordList.delete(keyword);
        keywordNode.remove();
        delButtonNode.remove();
    }, { once: true });

    addKeywordTextbox.value = null;
    addKeywordTextbox.focus();
    addKeywordButton.setAttribute("disabled", "true");
}

addKeywordButton.addEventListener("click", handleAddKeyword);

addKeywordTextbox.addEventListener("input", function () {
    const keyword = addKeywordTextbox.value;
    if (!keyword) {
        addKeywordButton.setAttribute("disabled", "true");
        return;
    }
    addKeywordContainer
        .querySelectorAll("div.error")
        .forEach((n) => n.remove());

    if (keywordList.has(keyword)) {
        addKeywordButton.setAttribute("disabled", "true");
        const node = document.createElement("div");
        node.textContent = "Keyword already added";
        node.className = "error";
        addKeywordContainer.appendChild(node);
        return;
    }

    addKeywordButton.removeAttribute("disabled");
});

addKeywordTextbox.addEventListener("keydown", function (e) {
    if (e.repeat) {
        return;
    }
    if (e.key !== "Enter") {
        return;
    }
    handleAddKeyword();
});

document.addEventListener("DOMContentLoaded", function () {
    addKeywordTextbox.focus();
});
