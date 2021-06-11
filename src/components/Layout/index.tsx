// import Header from './header';
interface Props {
}

const Layout: React.FC<Props> = ({ children }) => (
    <div className="Main">
        {/* <Header /> */}
        {children}
    </div>
);

export default Layout;
