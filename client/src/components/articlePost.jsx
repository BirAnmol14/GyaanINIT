import React from 'react';
import "./discuss.css"
import logo from '../components/logo.png';

function Articlepost(prop){
    return(
        
        <div style={{width:"60%",height:"60%",marginLeft:"30%",marginRight:"25%"}} class="card">
            <div class="col-md-10 blogShort">
                <h1>Title</h1>
                <img src={logo} alt="post img" class="pull-left img-responsive thumb margin10 img-thumbnail" />
                
                <article><p>
                Plato founded the Academy in Athens, the first institution of higher learning in Europe. The city of Alexandria in Egypt, established in 330 BCE, became the successor to Athens as the intellectual cradle of Ancient Greece. There, the great Library of Alexandria was built in the 3rd century BCE. European civilizations suffered a collapse of literacy and organization following the fall of Rome in CE 476.
                In China, Confucius (551–479 BCE), of the State of Lu, was the country's most influential ancient philosopher, whose educational outlook continues to influence the societies of China and neighbours like Korea, Japan, and Vietnam. Confucius gathered disciples and searched in vain for a ruler who would adopt his ideals for good governance, but his Analects were written down by followers and have continued to influence education in East Asia into the modern era.
                The Aztecs also had a well-developed theory about education, which has an equivalent word in Nahuatl called 
                tlacahuapahualiztli. It means "the art of raising or educating a person", or 
                "the art of strengthening or bringing up men". This was a broad conceptualization of education, 
                which prescribed that it begins at home, supported by formal schooling, and reinforced by community living. 
                Historians cite that formal education was mandatory for everyone regardless of social class and gender.
                There was also the word neixtlamachiliztli, which is "the act of giving wisdom to the face." 
                These concepts underscore a complex set of educational practices, 
                which was oriented towards communicating to the next generation the experience and intellectual 
                heritage of the past for the purpose of individual development and his integration into the community. 
                    </p></article>
                <a class="btn btn-blog pull-right marginBottom10" href={prop.link}>{prop.read}</a> 
            </div>
        </div>
    );
}

export default Articlepost;