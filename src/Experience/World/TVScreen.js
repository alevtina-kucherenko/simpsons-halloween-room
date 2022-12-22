import * as THREE from 'three'

import Experience from '../Experience.js'

import vertexShader from '../shaders/TVScreen/vertex.glsl'
import fragmentShader from '../shaders/TVScreen/fragment.glsl'

export default class TVScreen {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('TVScreen')
        }

        this.setModel()
    }

    setModel() {
        this.model = {}

        this.model.colorStart = '#cccaca'
        this.model.colorEnd = '#000000'

        // Material
        this.model.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader,
            fragmentShader,
            uniforms:
                {
                    uTime: { value: 0 },
                    uColorStart: { value: new THREE.Color(this.model.colorStart) },
                    uColorEnd: { value: new THREE.Color(this.model.colorEnd) }
                }
        })

        // Mesh
        this.model.mesh = this.resources.items.simpsonsModel.scene.children.find((child) => child.name === 'emissionTV')
        this.model.mesh.material = this.model.material
        this.scene.add(this.model.mesh)

        // Debug
        if (this.debug) {
            this.debugFolder.addColor(this.model, 'colorStart')
                .onChange(() => {
                    this.model.material.uniforms.uColorStart.value.set(this.model.colorStart)
                })

            this.debugFolder.addColor(this.model, 'colorEnd')
                .onChange(() => {
                    this.model.material.uniforms.uColorEnd.value.set(this.model.colorEnd)
                })
        }
    }

    update() {
        this.model.material.uniforms.uTime.value = this.time.elapsed
    }
}