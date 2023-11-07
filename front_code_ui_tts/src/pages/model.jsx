import React from "react";
import styles from '../css/model.module.css';
import ModelComponent from "../component/modelComponent";

const testJson = {
    "status": 200,
    "message": "success",
    "count": 3,
    "components": [
      {
        "id" : 4123,
        "description" : "test1"
      },
      {
        "id" : 3142,
        "description" : "test2"
      },
      {
        "id" : 1643,
        "description" : "test3"
      }
    ]
  };


function Model(){
    const components = testJson.components;
    return(
        <div className={styles.modelBackground}>
            <div className={styles.models}>
                {components.map(component =>(
                    <ModelComponent modelid={component.id} description={component.description}/>
                ))}
            </div>
        </div>
    );

}

export default Model;