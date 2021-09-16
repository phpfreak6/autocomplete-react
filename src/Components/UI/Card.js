import '../UI/Card.css';

export default function Card(props) {
    const classes = props.className;
    return (
        <div className={classes}>
            {props.children}
        </div>
    );
}