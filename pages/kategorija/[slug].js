import React from 'react'
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';


const KatDetails = ({proizvodi, kategorija}) => {
  const pom=()=>{

  }
  return (
    <div >
      <div className='centar'>
      <div className='rel'>
        <p>{kategorija.ime}</p>
        <div className='crnina'></div>
        <img className='slidza' src={urlFor(kategorija.slika)}/>
      </div> 
  </div>
      <div>
        <div className="products-container grid2">
          {proizvodi?.map((product) =>product.kategorije==kategorija.ime ?  <Product key= {product._id} product={product} />:null)}     
        </div>
      </div>
      
      
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "kategorije"] {
    slug {
      current
    }
  }
  `;
  const kategorije = await client.fetch(query);
  const paths = kategorije.map((kategorija) => ({
    params: {  
      slug: kategorija.slug.current
    }
  }));
  return { 
    paths,
    fallback: 'blocking'
  }
}
export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "kategorije" && slug.current == '${slug}'][0]`;
  
  const kategorija = await client.fetch(query);
  const productsQuery = '*[_type == "product"]'
  const proizvodi = await client.fetch(productsQuery);

  

  return {
    props: { proizvodi, kategorija }
  }
}

export default KatDetails