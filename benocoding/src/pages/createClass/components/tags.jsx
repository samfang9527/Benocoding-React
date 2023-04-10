
import styled from 'styled-components';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { cyan, amber } from '@mui/material/colors';

import { useState } from 'react';


const CustomFormGroup = styled(FormGroup)`
    display: flex;
    flex-direction: row !important;
    flex-wrap: wrap;
`;

const Tags = ({ checkedTags, setCheckedTags }) => {

    const [tags, setTags] = useState(["Javascript", "Python", "Golang"]);

    return (
        <CustomFormGroup>
            {
                tags.map((ele, idx) => {
                    return (
                        <FormControlLabel className="class-tags" control={<Checkbox sx={{
                            color: cyan[50],
                            '&.Mui-checked': {
                                color: amber[100],
                            },
                            '& .MuiSvgIcon-root': { fontSize: 28 },
                            zIndex: -1
                        }}/>} label={ele} key={idx}/>
                    )
                })
            }
        </CustomFormGroup>
    )
}

export default Tags;