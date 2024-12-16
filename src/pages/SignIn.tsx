import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignInCard from '../components/Auth/SignInCard';
import {AppHeader, Content} from '../components/Auth/Content';
import AppTheme from '../theme/shared-theme/AppTheme';
import ColorModeSelect from '../theme/shared-theme/ColorModeSelect';

export default function SignIn(props: { disableCustomTheme?: boolean }) {
    const [isTextAnimationComplete, setIsTextAnimationComplete] = React.useState(false);


    return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Stack
            direction="column"
            component="main"
            sx={[
                {
                    justifyContent: 'center',
                    marginTop: 0,
                    minHeight: '100vh',
                    position: 'relative',
                },
                (theme) => ({
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'fixed',
                        zIndex: -1,
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage:
                            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        ...theme.applyStyles('dark', {
                            backgroundImage:
                                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                        }),
                    },
                }),
            ]}
        >
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{
                    justifyContent: 'center',
                    gap: { xs: 6, sm: 12 },
                    p: 2,
                    mx: 'auto',
                    width: '100%',
                }}
            >
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    sx={{
                        justifyContent: 'center',
                        gap: { xs: 6, sm: 12 },
                        p: { xs: 2, sm: 4 },
                        m: 'auto',
                        width: { xs: '100%', sm: 'auto' },
                    }}
                >
              <Stack
                  sx={{
                      flexDirection: 'column',
                      alignSelf: 'top',
                      gap: 4,
                      width: {
                          xs: '100%',
                          sm: '80%',
                          md: 450,
                      },
                      maxWidth: 450,
                  }}
              >
                <AppHeader setIsTextAnimationComplete={setIsTextAnimationComplete} />
                <Content isTextAnimationComplete={isTextAnimationComplete}/>
            </Stack>
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </AppTheme>
  );
}
