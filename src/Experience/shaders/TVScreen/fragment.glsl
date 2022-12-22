uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

varying vec2 vUv;

#pragma glslify: cnoise = require('../perlin3d.glsl')

void main()
{
    vec2 displacedUv = vUv + cnoise(vec3(vUv * 500.0, uTime * 0.0001));

    float strength = cnoise(vec3(displacedUv * 500.0, uTime * 0.0002));
    strength += step(- 0.2, strength) * 0.8;
    strength = clamp(strength, 0.0, 1.0);

    vec3 color = mix(uColorStart, uColorEnd, strength);

    gl_FragColor = vec4(color, 1.0);
}
