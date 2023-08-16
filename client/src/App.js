import "./App.css";
import ChatbotComponent from "./components/ChatbotComponent";
import { Provider } from "react-redux";
import store from "./store";
import "react-chatbot-kit/build/main.css";
import LearningOptions from "./components/chabot-components/Responses";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main className="main-wraper">
          <ChatbotComponent />
        </main>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
