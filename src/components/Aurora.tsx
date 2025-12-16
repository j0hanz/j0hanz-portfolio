import { useEffect, useEffectEvent, useRef, useState } from 'react';

import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { Color, Mesh, Program, Renderer, Triangle } from 'ogl';

import { AURORA_CONFIG, PALETTES } from '@/config/constants';
import { auroraColorStops } from '@/config/reactbits';
import {
  useAnimationConfig,
  useNavigationState,
  useThemeModeState,
} from '@/hooks';

// WebGL shaders
const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \\
  int index = 0;                                            \\
  for (int i = 0; i < 2; i++) {                               \\
     ColorStop currentColor = colors[i];                    \\
     bool isInBetween = currentColor.position <= factor;    \\
     index = int(mix(float(index), float(i), float(isInBetween))); \\
  }                                                         \\
  ColorStop currentColor = colors[index];                   \\
  ColorStop nextColor = colors[index + 1];                  \\
  float range = nextColor.position - currentColor.position; \\
  float lerpFactor = (factor - currentColor.position) / range; \\
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \\
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

// Section color palettes - derived from auroraColorStops
// Each section needs 3 color stops for the aurora gradient
function getSectionColorStops(
  sectionId: string,
  mode: 'light' | 'dark'
): string[] {
  const sectionColors =
    auroraColorStops[sectionId as keyof typeof auroraColorStops] ??
    auroraColorStops.hero;

  return mode === 'dark' ? [...sectionColors.dark] : [...sectionColors.light];
}

interface AuroraProps {
  colorStops: string[];
  amplitude: number;
  blend: number;
  speed: number;
}

interface AuroraCanvasProps extends AuroraProps {
  colorKey: string;
}

// WebGL Aurora canvas - handles actual rendering
// React 19 Compiler handles memoization automatically
function AuroraCanvas({
  colorStops,
  amplitude,
  blend,
  speed,
}: AuroraCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use useEffectEvent to always get latest props without causing Effect re-runs
  const getLatestProps = useEffectEvent(() => ({
    colorStops,
    amplitude,
    blend,
    speed,
  }));

  // Memoize color conversion to avoid creating new Color objects every frame
  const colorStopsArrayRef = useRef<number[][]>([]);
  useEffect(() => {
    colorStopsArrayRef.current = colorStops.map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });
  }, [colorStops]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    const resize = () => {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    };
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: colorStopsArrayRef.current },
        uResolution: { value: [container.offsetWidth, container.offsetHeight] },
        uBlend: { value: blend },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);

    let isActive = true;
    let animateId = 0;
    const update = (t: number) => {
      if (!isActive) return;

      animateId = requestAnimationFrame(update);

      if (!isActive || !program) return;

      const props = getLatestProps();
      program.uniforms.uTime.value = t * 0.01 * props.speed * 0.1;
      program.uniforms.uAmplitude.value = props.amplitude;
      program.uniforms.uBlend.value = props.blend;
      program.uniforms.uColorStops.value = colorStopsArrayRef.current;
      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      isActive = false;
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (container && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      try {
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      } catch {
        // Context already lost (e.g., mobile backgrounding, GPU reset)
        // Cleanup not needed
      }
    };
  }, [colorStops, amplitude, blend, speed]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: 1,
        height: 1,
        position: 'absolute',
        inset: 0,
      }}
    />
  );
}

// Static fallback for reduced motion - simple gradient overlay
function AuroraStatic({ colorStops }: { colorStops: string[] }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${colorStops[0]}33 0%, ${colorStops[1]}22 50%, ${colorStops[2]}33 100%)`,
        opacity: 0.6,
      }}
    />
  );
}

// Main Aurora component with section-based color switching
function Aurora(): React.JSX.Element {
  const { mode } = useThemeModeState();
  const { prefersReducedMotion } = useAnimationConfig();
  const { activeSectionId } = useNavigationState();
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);

  // Handle document visibility for performance
  useEffect(() => {
    const handleVisibility = () => setIsDocumentVisible(!document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const shouldAnimate = !prefersReducedMotion && isDocumentVisible;

  const sectionId = activeSectionId ?? 'hero';
  const colorStops = getSectionColorStops(sectionId, mode);
  const colorKey = `${sectionId}-${mode}`;

  // Get mode-specific config
  const amplitude = AURORA_CONFIG.amplitude[mode];
  const blend = AURORA_CONFIG.blend[mode];
  const speed = AURORA_CONFIG.speed[mode];

  // Get theme-aware background color directly from PALETTES (CSS vars don't work in Canvas)
  const bgColor = PALETTES[mode].background.default;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        bgcolor: bgColor,
      }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        <Box
          component={motion.div}
          key={colorKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 0, 0.1, 1] }}
          sx={{
            position: 'absolute',
            inset: 0,
          }}
        >
          {shouldAnimate ? (
            <AuroraCanvas
              colorKey={colorKey}
              colorStops={colorStops}
              amplitude={amplitude}
              blend={blend}
              speed={speed}
            />
          ) : (
            <AuroraStatic colorStops={colorStops} />
          )}
        </Box>
      </AnimatePresence>
    </Box>
  );
}

export { Aurora };
