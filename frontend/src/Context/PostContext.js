import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const PostContext = createContext();

const initialForm = {
  nome: "",
  marca: "",
  modelo: "",
  valor: "",
  foto: "",
}; 

export const PostProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(initialForm);
  const [Posts, setPosts] = useState([]);
  const [Post, setPost] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const getPosts = async () => {
    const apiPosts = await axios.get("posts");
    setPosts(apiPosts.data.data);
  };

  const getPost = async (id) => {
    const response = await axios.get("posts/" + id);
    const apiPost = response.data.data;
    setPost(apiPost);
    setFormValues({
      nome: apiPost.nome,
      marca: apiPost.marca,
      modelo: apiPost.modelo,
      valor: apiPost.valor,
      foto: apiPost.foto
    });
  };

  const storePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post("posts", formValues);
      setFormValues(initialForm);
      navigate("/admin/posts");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.put("posts/" + Post.id, formValues);
      setFormValues(initialForm);
      navigate("/admin/posts");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure")) {
      return;
    }
    await axios.delete("posts/" + id);
    getPosts();
  };

  return (
    <PostContext.Provider
      value={{
        Post,
        Posts,
        getPost,
        getPosts,
        onChange,
        formValues,
        storePost,
        errors,
        setErrors,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
