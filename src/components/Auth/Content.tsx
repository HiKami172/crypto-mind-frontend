import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import Slide from '@mui/material/Slide';
import { SitemarkIcon } from './CustomIcons';
import { TypeAnimation } from 'react-type-animation';

const items = [
    {
        icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Adaptable performance',
        description:
            'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
    },
    {
        icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Built to last',
        description:
            'Experience unmatched durability that goes above and beyond with lasting investment.',
    },
    {
        icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Great user experience',
        description:
            'Integrate our product into your routine with an intuitive and easy-to-use interface.',
    },
    {
        icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
        title: 'Innovative functionality',
        description:
            'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
    },
];

export function Content({ isTextAnimationComplete }: { isTextAnimationComplete: boolean }) {
    const [visibleIndexes, setVisibleIndexes] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (isTextAnimationComplete) {
            const timeouts = items.map((_, index) =>
                setTimeout(() => {
                    setVisibleIndexes((prev) => [...prev, index]);
                }, (index + 1) * 500) // Stagger animations
            );
            return () => timeouts.forEach(clearTimeout); // Cleanup timeouts
        }
    }, [isTextAnimationComplete]);

    return (
        <React.Fragment>
            {items.map((item, index) => (
                <Slide
                    key={index}
                    direction="right"
                    in={visibleIndexes.includes(index)}
                    mountOnEnter
                    unmountOnExit
                    timeout={1000} // Adjust animation duration
                >
                    <Stack direction="row" sx={{ gap: 2 }}>
                        {item.icon}
                        <div>
                            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                                {item.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {item.description}
                            </Typography>
                        </div>
                    </Stack>
                </Slide>
            ))}
        </React.Fragment>
    );
}

export function AppHeader({ setIsTextAnimationComplete }: { setIsTextAnimationComplete: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SitemarkIcon />
            <TypeAnimation
                sequence={[
                    'CryptoMind',
                    () => setIsTextAnimationComplete(true),
                ]}
                wrapper="span"
                speed={1}
                style={{
                    fontSize: 'clamp(1rem, 10vw, 2.15rem)',
                    fontFamily: `'Courier New', monospace`,
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: 'white',
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                }}
            />
        </Box>
    );
}