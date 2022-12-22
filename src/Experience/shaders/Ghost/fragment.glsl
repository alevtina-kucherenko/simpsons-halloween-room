uniform float uTime;
uniform vec3 uColor;
uniform vec2 uUvFrequency;
uniform float uTimeFrequency;

varying vec2 vUv;

#pragma glslify: perlin2d = require('../perlin2d.glsl')

void main()
{
    vec2 uv = vUv * uUvFrequency;
    uv.y -= uTime * uTimeFrequency;
    uv *= 0.3;

    float borderAlpha = min(vUv.x * 4.0, (1.0 - vUv.x) * 4.0);
    borderAlpha = borderAlpha * (1.0 - vUv.y);

    float perlin = perlin2d(uv);
    perlin *= borderAlpha;
    perlin *= 0.6;
    perlin = min(perlin, 1.0);

    gl_FragColor = vec4(uColor, uv);
}