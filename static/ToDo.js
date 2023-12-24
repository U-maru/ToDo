// データの登録
const btnAdd = document.querySelector('#add-submit')
btnAdd.addEventListener("click", (event) => {
    // 現在動作中のクリックイベント以外のボタンイベントをキャンセル（データの送信自体もキャンセルされる）
    event.preventDefault()

    // 登録するデータを収集
    const formData = new FormData()
    formData.append("name", document.querySelector('#add-Name').value)
    formData.append("title", document.querySelector('#add-Title').value)
    formData.append("state", document.querySelector('#add-State').value)
    formData.append("date", document.querySelector('#add-Date').value)
    formData.append("text", document.querySelector('#add-Text').value)

    console.log("送信データ:formData", ...formData)

    if ((formData.get("name") != "") || (formData.get("title") != "") || (formData.get("date") != "") || (formData.get("text") != "")) {
        // データ登録のWeb APIを/addressをPOSTメソッドで呼び出す
        fetch("/ToDo_List", {
            method: 'POST',
            body: formData, // 登録するデータ(FormData形式)
        }).then((response) => {
            console.log("送信されたデータ", response)
        })
    } else {
        console.log("送信していません！")
    }
})