import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getProfilePhoto } from '../../fetch/userAPI'
import { getAddress } from '../../fetch/admin'


const ReportedElement = ({key, item, index}) => {
    const [profilePhoto, setProfilePhoto] = useState('')
    const [addressProfile, setAddressProfile] = useState('')

    const {data: profilePhotoData} = useQuery({
        queryKey: ['profilePhoto', item?.idUser],
        queryFn: getProfilePhoto(item?.idUser)
    })

    const {data: address} = useQuery({
        queryKey: ['address', item?.idAddress],
        queryFn: getAddress(item?.idAddress)
    })
    const getaddress = getAddress(item?.idAddress)
    .then((res) => {
        setAddressProfile(res?.idDepartment?.departmentName)
    })

    

    useEffect(() => {
        setProfilePhoto(profilePhotoData)
        console.log(profilePhotoData)
    }, [profilePhotoData])

    useEffect(() => {
        console.log(address)
    }, [address])

  return (
    <ListItem key={key}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={profilePhoto} />
        </ListItemAvatar>
        <ListItemText primary={`${item.firstName} ${item.lastName}`} secondary={addressProfile} />
      </ListItem>
  )
}

ReportedElement.propTypes = {
    key: PropTypes.number,
    item: PropTypes.object,
    index: PropTypes.number
}

export default ReportedElement