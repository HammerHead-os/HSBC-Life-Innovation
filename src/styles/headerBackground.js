export const HK_SKYLINE_BG = `${import.meta.env.BASE_URL}hk-skyline-bg.png`;

export const mobileHeaderStyle = {
  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%), url(${HK_SKYLINE_BG})`,
  backgroundPosition: 'center top',
};

export const webHeaderStyle = {
  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.35) 100%), url(${HK_SKYLINE_BG})`,
  backgroundPosition: 'center 30%',
  backgroundSize: 'cover',
};
