import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetails from "../features/posts/Details/postDetails"; 



const routesRouter = () => {
  console.log('Routes')
  return (
    <Router>
      <Routes>
        <Route path="/post-details/:id" exact element={<PostDetails/>} />
        </Routes>
    </Router>
  );
};

export default routesRouter;