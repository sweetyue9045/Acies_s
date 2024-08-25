export default function Title({ mainTitle, subTitle, ls, lss, className }) {
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
        <div className={`title ${className}`}>
            <div className="title-top">{mainTitle}</div>
            <div className="title-bottom" style={style}>{subTitle}</div>
        </div>
    );
}