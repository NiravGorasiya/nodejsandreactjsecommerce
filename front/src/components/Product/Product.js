import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'

const Product = () => {
    const [formValues, setFormValues] = useState([
        { name: "", email: "" }
    ])
    const [list, setList] = useState([])
    const [value, setValue] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3000/product")
            .then((res) => {
                setList(res.data);
                console.log(res, "response");
            })
            .catch((err) => {
                console.log(err, "error");
            })
    }, [])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        alert(JSON.stringify(formValues))
    }
    let addFromFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
    }
    console.log(values, "sdsdf");
    return (
        <div>

            <form onSubmit={handleSubmit}>
                {
                    formValues.map((element, index) => (
                        <div className='form-inline' key={index}>
                            <label>Name</label>
                            <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                            <label>Email</label>
                            <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
                            {
                                index ?
                                    <button type="text" className='button remove' onClick={() => removeFormFields(index)}>Remove</button>
                                    : null
                            }
                        </div>
                    ))
                }
                <div className='button-section'>
                    <button className='button add' type='button' onClick={() => addFromFields()}>Add</button>
                    <button type="submit" className='button submit'>Submit</button>
                </div>
            </form>

            <select onChange={(e) => setValue(e.target.value)}>
                <option value="selected">selected value</option>
                {
                    list.map((item) => (
                        item.attributed.map((list) => (
                            <option value={list._id}>{list.name}</option>
                        ))
                    ))
                }
            </select>
            <button>submit</button>
        </div >
    )
}

export default Product
