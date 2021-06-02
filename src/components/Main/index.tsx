import './main.scss';

const Main = () => {
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        console.log('hihi first')
    }

    return (
        <div className="d-flex justify-content-center">
            Main
            <input className="d-flex justify-content-center" onChange={onChange} id="input-typeing" />
        </div>
    );
};

export default Main;