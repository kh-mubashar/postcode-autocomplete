import { PostCodeDetails } from '@/types/Postcode'
import { Box, Button, CardActions, CardContent, Typography } from '@mui/material'
import { useState } from 'react'
export interface Props {
  details?: PostCodeDetails
}
export const PostcodeDetails = ({details}:Props) => {
  const [showDetails, setShowDetails]=useState(false)
  return (
    <Box width={450}>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>recent search:</Typography>
      <CardContent>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h5" component="div">
            {details?.postcode}
          </Typography>
        </Box>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>District: {details?.admin_district}, {details?.region}, {details?.country}</Typography>
        <Box display="flex">
          <Typography variant="body1">
            Coordinates: Longitude: {details?.longitude} , Latitude: {details?.latitude}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button onClick={()=>setShowDetails(!showDetails)} size="small">{showDetails? "Hide Details": 'Show Details'}</Button>
      </CardActions>
      {showDetails && 
        <Box width={400} m={2} sx={{backgroundColor:'#fafafa'}}>
          <pre >{JSON.stringify(details, null, 2)}</pre>
        </Box>
      }
    </Box>
  )
}
