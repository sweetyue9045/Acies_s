export default function Title({ Title_top, Title_bottom, Id, ls, lss }) {
    const style = {}
    if (document.body.clientWidth <= 834) {
        style.letterSpacing = `${lss}px`
        style.marginRight = `-${(lss - 2)}px`
    }
    else {
        style.letterSpacing = `${ls}px`
        style.marginRight = `-${(ls - 2)}px`
    }
    return (
        <div className="title" id={Id}>
            <div className="title_top">{Title_top}</div>
            <div className="title_bottom" style={style}>{Title_bottom}</div>
        </div>
    );
}