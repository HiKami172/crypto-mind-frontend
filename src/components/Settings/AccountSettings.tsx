import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography, CircularProgress, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../store/store"; // Import RootState from your store
import { updateUser } from "../../store/userSlice";
import IconButton from "@mui/material/IconButton"; // Import the updateUser action
import EditIcon from "@mui/icons-material/Edit";
import BinanceCredentials from "./BinanceCredentials";

// Styled container for avatar with hover effect
const AvatarContainer = styled('div')({
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
});

// Styled image and edit icon
const AvatarImage = styled('img')({
    width: 100,
    height: 100,
    borderRadius: '50%',
    objectFit: 'cover',
});

const EditButton = styled(IconButton)({
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
});

const AccountSettings = () => {
    const dispatch = useDispatch<AppDispatch>(); // Use AppDispatch to properly type dispatch
    const user = useSelector((state: RootState) => state.user); // Access user data from Redux

    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>(user.name);
    const [avatar, setAvatar] = useState<string>(user.avatar);
    const [newAvatar, setNewAvatar] = useState<File | null>(null); // For file input

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            // Dispatch the updateUser action to update Redux store and backend
            await dispatch(updateUser({ name, avatar: newAvatar ? URL.createObjectURL(newAvatar) : avatar })).unwrap();  // unwrap() to catch rejected state

            alert("Account updated successfully");
        } catch (error) {
            console.error("Error updating account", error);
            alert("Failed to update account");
        } finally {
            setLoading(false);
        }
    };

    // Handle avatar change
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewAvatar(file); // Set the selected avatar file
            setAvatar(URL.createObjectURL(file)); // Set the preview of the avatar
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Account Settings
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AvatarContainer>
                            <AvatarImage
                                src={avatar}
                                alt="Avatar"
                                onClick={() => document.getElementById("avatar-upload")?.click()}
                            />
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleAvatarChange}
                            />
                            <EditButton
                                sx={{borderRadius: "50%"}}
                                onClick={() => document.getElementById("avatar-upload")?.click()}
                            >
                                <EditIcon />
                            </EditButton>
                        </AvatarContainer>
                    </Grid>
                    {/* Full Name */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>

                    {/* Email (disabled, as it shouldn't be changed) */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={user.email}
                            disabled
                        />
                    </Grid>

                    {/* Avatar */}

                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <BinanceCredentials />
        </Box>
    );
};

export default AccountSettings;
