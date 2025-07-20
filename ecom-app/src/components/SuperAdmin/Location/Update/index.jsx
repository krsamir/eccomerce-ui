import {TextField, Typography} from '@mui/material';
export default function Update() {
  return(
     <>
     <div style={{display: 'flex', columnGap: '20px', marginBottom:'10px', alignItems:'center', margin:'10px', padding:'10px'}}>
      <Typography sx={{width: '100px'}}>Name:</Typography>
      <TextField size='small'
        label="Name"
        name="name"
        required
      />
     </div>
     
     <div style={{display: 'flex', columnGap: '20px', marginBottom:'10px', alignItems:'center', margin:'10px', padding:'10px'}}>
      <Typography sx={{width: '100px'}}>City:</Typography>
      <TextField size='small'
        label="City"
        name="city"
        required
      />
     </div>
     <div style={{display: 'flex', columnGap: '20px', marginBottom:'10px', alignItems:'center',margin:'10px', padding:'10px'}}>
      <Typography sx={{width: '100px'}}>State:</Typography>
      <TextField size='small'
        label="State"
        name="state"
        required
      />
     </div>
     <div style={{display: 'flex', columnGap: '20px', marginBottom:'10px', alignItems:'center', margin:'10px', padding:'10px'}}>
      <Typography sx={{width: '100px'}}>Country:</Typography>
      <TextField size='small'
        label="Country"
        name="country"
        required
      />
     </div>
    </>
  )   
}