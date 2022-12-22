uniform float uTime;

varying vec2 vUv;

#pragma glslify: perlin2d = require('../perlin2d.glsl')

void main()
{
    vec3 newPosition = -position;
    vec2 displacementUv = uv;
    displacementUv *= 5.0;
    displacementUv.y -= uTime * 0.002;

    float displacementStrength = pow(uv.y * 3.0, 2.0);
    float perlin = perlin2d(displacementUv) * displacementStrength;

    newPosition.y -= perlin * 0.04;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
}