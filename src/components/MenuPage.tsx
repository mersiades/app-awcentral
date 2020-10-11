import React, { FC, useState } from 'react';
import { Button, Box, Image, Heading, FormField, TextInput, Text, Grid } from 'grommet';
import { Close } from 'grommet-icons';
import { useAuth } from '../contexts/authContext';
import '../assets/styles/transitions.css';
import CreateGameForm from './CreateGameForm';
import { useDiscordUser } from '../contexts/discordUserContext';
import { useQuery } from '@apollo/client';
import USER_BY_DISCORD_ID from '../queries/userByDiscordId';
import GamesList from './GamesList';

const background = {
  color: 'black',
  dark: true,
  size: 'contain',
  image: 'url(/images/cover-background.jpg)',
};

const MenuPage: FC = () => {
  const [buttonsContainer, setButtonsContainer] = useState(0);
  // ---------------------------------- Accessing React context -------------------------------------------- //
  const { logOut } = useAuth();
  const { username, discordId } = useDiscordUser();

  // ------------------------------ Hooking in to Apollo graphql ----------------------------------------- //
  const { data: userData, loading } = useQuery(USER_BY_DISCORD_ID, { variables: { discordId }, skip: !discordId });
  !!userData && console.log('userData', userData);

  const handleLogout = () => {
    logOut();
  };

  if (loading || !userData) {
    return <Box fill background={background} />
  }

  return (
    <Box fill background={background}>
    <Grid
      rows={["49%", "49%", "2%"]}
      columns={["18%", "auto", "18%"]}
      gap={{ column: "xsmall", row: "none"}}
      fill
      responsive
      areas={[
        { name: "leftMargin", start: [0,0], end: [0, 2]},
        { name: "centerTop", start: [1,0], end: [1, 0]},
        { name: "centerBottom", start: [1,1], end: [1, 1]},
        { name: "centerFooter", start: [1,2], end: [1, 2]},
        { name: "rightMargin", start: [2,0], end: [2, 2]}

      ]}
      >
      <Box gridArea="leftMargin"/>
      <Box gridArea="centerTop">
           <Heading level="4">
         {username && `Welcome, ${username}`}
         </Heading>
      </Box>
      <Box gridArea="centerBottom">
        <Grid
          rows={["full"]}
          columns={[["250px", "450px"], ["5%", "auto"], ["250px", "450px"]]}
          fill
          justifyContent="between"
          areas={[
            { name: "buttonsContainer", start: [0,0], end: [0, 0]},
            { name: "spacer", start: [1,0], end: [1, 0]},
            { name: "titleContainer", start: [2,0], end: [2, 0]},
          ]}
        >
        <Box gridArea="buttonsContainer" alignSelf="end">
               {buttonsContainer === 0 && (
          <Box animation={{ type: "slideUp", size: "large", duration: 750}}>
            <Box gap="small">
              {!!userData && userData.userByDiscordId.gameRoles.length > 0 && (
                <Button
                  label="RETURN TO GAME"
                  primary
                  size="large"
                  alignSelf="center"
                  fill
                  onClick={() => setButtonsContainer(1)}
                />
              )}
              <Button
                label="JOIN GAME"
                secondary
                size="large"
                alignSelf="center"
                fill
                onClick={() => setButtonsContainer(2)}
              />
              <Button
                label="CREATE GAME"
                secondary
                size="large"
                alignSelf="center"
                fill
                onClick={() => setButtonsContainer(3)}
              />
             <Button label="LOG OUT" size="large" alignSelf="center" fill onClick={() => handleLogout()} />
            </Box>
          </Box>
        )}
         { buttonsContainer === 1 && (
          <Box animation={{ type: "slideUp", size: "large", duration: 750}}>
            <Grid
              rows={['xsmall']}
              columns={['xxsmall', 'small']}
              justifyContent="between"
              align="center"
              areas={[
                { name: 'header-left', start: [0, 0], end: [0, 0] },
                { name: 'header-right', start: [1, 0], end: [1, 0] },
              ]}
            >
              <Box gridArea="header-left" align="start" alignContent="center">
                <Close color="accent-1" onClick={() => setButtonsContainer(0)} />
              </Box>
              <Box gridArea="header-right">
                <Heading level={1} margin={{ vertical: 'small' }} size="small" textAlign="end">
                  YOUR GAMES
                </Heading>
              </Box>
            </Grid>
            <GamesList gameRoles={userData.userByDiscordId.gameRoles} />
          </Box>
        )}
        {buttonsContainer === 2 && (
          <Box animation={{ type: "slideUp", size: "large", duration: 750}}>
            <Grid
              rows={['xsmall']}
              columns={['xxsmall', 'small']}
              justifyContent="between"
              align="center"
              areas={[
                { name: 'header-left', start: [0, 0], end: [0, 0] },
                { name: 'header-right', start: [1, 0], end: [1, 0] },
              ]}
            >
              <Box gridArea="header-left" align="start" alignContent="center">
                <Close color="accent-1" onClick={() => setButtonsContainer(0)} />
              </Box>
              <Box gridArea="header-right">
                <Heading level={1} margin={{ vertical: 'small' }} size="small" textAlign="end">
                  JOIN GAME
                </Heading>
              </Box>
            </Grid>
            <Box gap="small">
              <FormField label="Game code">
                <TextInput placeholder="Enter code" />
              </FormField>
              <Text color="accent-1" margin={{ top: 'xsmall' }}>
                Don't have a game code? Ask your game's MC for it
              </Text>
              <Button label="SUBMIT" primary size="large" alignSelf="center" fill />
            </Box>
          </Box>
        )}
        {buttonsContainer === 3 && (
          <Box animation={{ type: "slideUp", size: "large", duration: 750}}>
            <Grid
              rows={['xsmall']}
              columns={['xxsmall', 'small']}
              justifyContent="between"
              align="center"
              areas={[
                { name: 'header-left', start: [0, 0], end: [0, 0] },
                { name: 'header-right', start: [1, 0], end: [1, 0] },
              ]}
            >
              <Box gridArea="header-left" align="start" alignContent="center">
                <Close color="accent-1" onClick={() => setButtonsContainer(0)} />
              </Box>
              <Box gridArea="header-right">
                <Heading level={1} margin={{ vertical: 'small' }} size="small" textAlign="end">
                  CREATE GAME
                </Heading>
              </Box>
            </Grid>
            <CreateGameForm />
          </Box>
        )}
        </Box>
        <Box gridArea="spacer" alignSelf="end"/> 
        <Box gridArea="titleContainer" alignSelf="end">
         <Box>
           <Image
            fit="contain"
            fill={true}
            src="images/cover-title.png"
            alt="D. Vincent Baker & Meguey Baker Apocalypse World"
          />
        </Box>
        </Box>
        </Grid>
      </Box>
      <Box gridArea="rightMargin"/>
    </Grid>
    </Box>
  )
};

export default MenuPage;
