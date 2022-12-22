import React, { useEffect, useContext, useState } from "react";
import PostContext from "../Context/PostContext";

export const Home = () => {
  const { Posts, getPosts,  } = useContext(PostContext);

  const [selected, setSelected] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const handleChange = event => {

    if (event.target.value == 'menorValor') {
      Posts.sort((a, b) => a.valor - b.valor);
    } else if (event.target.value == 'maiorValor') {
      Posts.sort((a, b) => b.valor - a.valor);
    }
    setSelected(event.target.value);
  };


  return (
    <div>
      <div className="content m-5">
        <div id="cards" className="row">

          <div className="col-12">
            <nav className="navbar navbar-dark bg-dark p-4">
              <h1 className="text-white">Ordenar:</h1>
              <select className="form-select" aria-label="Default select example" onChange={handleChange}>

                <option selected disabled>Ordenar</option>
                <option value="menorValor">Menor Valor</option>
                <option value="maiorValor">Maior Valor</option>

              </select>
            </nav>
          </div>

          {
            Posts.map((Post) => {
              return (
                <div className="col-3 p-4">
                  <div className="card bg-grey">
                    <div className="d-flex justify-content-center align-items-center">
                      <img className="mt-2" width={200} height={200} src={Post.foto} alt={Post.nome} />
                    </div>
                    <div className="p-4 d-flex flex-column">
                      <h4>Nome: {Post.nome}</h4>
                      <span>Marca {Post.marca}</span>
                      <span>Modelo {Post.modelo}</span>
                      <span>Preço R$ {Post.valor}</span>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};
