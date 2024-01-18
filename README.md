# Acies 雙生之旅ㅣ官方網站
>網站連接：[Acies 雙生之旅ㅣ官方網站](https://acies-s.vercel.app/)
>
## 介紹
>由於原本的[網站](https://acies-ten.vercel.app/)([Github](https://github.com/sweetyue9045/Acies))使用的API失效，導致後台無法工作、圖片遺失，加上當時是第一次寫React很多地方寫得不好，所以重寫這一個網站
>
### 後台功能-登入、新增文章、修改文章等
原本的網站利用串接API的方式來做到登入驗證和文章的修改、增減等功能，但這次沒有使用API，所以這邊使用localStorage來做到資料的改變與渲染和登入狀態呈現。

網站剛開啟時會先在localStorage存取一次預設的json資料，後面的資料渲染和後台的修改新增都是改變localStorage的資料，讓本地端可以做出後台的效果。

登入的部分在首次網站時，localStorage會新增空白的登入狀態資料，當進入登入頁面時，登入狀態中沒有使用者的話就會進入登入頁面，有使用者則會直接進入後台，登入驗證的部分使用預設的json資料來比對使用者。

### RWD
PC、PAD、Mobile

原本的網站並沒有設計手機板網頁，這次加入了手機板的RWD設計。
