import { useContext, useEffect, useState } from "react";
import PostContext from "../../../Context/PostContext";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'


export const PostEdit = () => {
  const {
    formValues,
    onChange,
    errors,
    setErrors,
    getPost,
    updatePost,
  } = useContext(PostContext);

  let { id } = useParams();

  const history = useNavigate();

  useEffect(() => {
    getPost(id);
    setErrors({});
    if (!localStorage.getItem('user-info')) {
      history("/login");
    }
  }, []);

  const [image, setImage] = useState('');

  const convert2base64 = e => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(file);
  }

  function setNativeValue(element, value) {
    let lastValue = element.value;
    element.value = value;
    let event = new Event("input", { target: element, bubbles: true });
    event.simulated = true;
    let tracker = element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    element.dispatchEvent(event);
  }

  let input = document.getElementById('foto');

  if (image) {
    setNativeValue(input, image);
  }

  return (
    <div className="mt-12">
      <form
        onSubmit={updatePost}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
          <div className="mb-4">
            <label htmlFor="nome" className="block mb-2 text-sm font-medium">
              Nome
            </label>
            <input
              name="nome"
              value={formValues["nome"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.nome && (
              <span className="text-sm text-red-400">{errors.nome[0]}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="marca" className="block mb-2 text-sm font-medium">
              Marca
            </label>
            <input
              name="marca"
              value={formValues["marca"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.marca && (
              <span className="text-sm text-red-400">{errors.marca[0]}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="modelo" className="block mb-2 text-sm font-medium">
              Modelo
            </label>
            <input
              name="modelo"
              value={formValues["modelo"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.modelo && (
              <span className="text-sm text-red-400">{errors.modelo[0]}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="valor" className="block mb-2 text-sm font-medium">
              Valor
            </label>
            <input
              type="number"
              name="valor"
              value={formValues["valor"]}
              onChange={onChange}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {errors.valor && (
              <span className="text-sm text-red-400">{errors.valor[0]}</span>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium">
              Foto
            </label>
            <input
              style={{ display: 'none' }}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
              name="foto" id="foto" onChange={onChange}
            />

            <input
              id="imagem"
              name="imagem"
              type="file"
              accept="image/*"
              onChange={e => convert2base64(e)}
              className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2"
            />
            {image ? (
              <img src={image} />
            ) : (
              <img src={formValues["foto"]} />
            )}
            {errors.foto && (
              <span className="text-sm text-red-400">{errors.foto[0]}</span>
            )}
          </div>

        </div>
        <div className="my-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
