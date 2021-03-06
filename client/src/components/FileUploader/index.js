import {useState} from 'react';
import axios from 'axios';
import { toast} from 'react-toastify';

import './style.css';

export const FileUploader = ({onSuccess}) => {
    const [files, setFiles] = useState([]);

    const onInputChange = (e) => {
        setFiles(e.target.files)
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();

        for(let i = 0; i < files.length; i++) {
            console.log(`uploading: ${files[i]}`)
            data.append('file', files[i]);
        }

        axios.post(`${process.env.REACT_APP_API_URL}/upload`, data)
            .then((response) => {
                toast.success('Upload Success');
                onSuccess(response.data)
            })
            .catch((e) => {
                toast.error('Upload Error: '+e)
            })
    };

    return (
        <form method="post" action="#" id="#" onSubmit={onSubmit}>
            <div className="form-group files">
                <label>Upload Videos </label>
                <input type="file"
                       onChange={onInputChange}
                       className="form-control"
                       multiple/>
            </div>
            
            <button>Upload</button>
        </form>
    )
};