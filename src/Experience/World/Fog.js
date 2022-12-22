import * as THREE from 'three'

import Experience from '../Experience.js'

export default class Fog {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder('fog')
        }

        this.setFog()
    }

    setFog() {
        this.color = '#262837'
        // // FogExp2
        // this.scene.fog = new THREE.FogExp2(this.color, 0.06)
        // Fog
        this.scene.fog = new THREE.Fog(this.color, 1, 20)


        if (this.debug) {
            // // FogExp2
            // this.debugFolder.addColor(this, 'color')
            //     .onChange(() => {
            //         this.scene.fog.color.set(this.color)
            //     })
            //
            // this.debugFolder.add(this.scene.fog, 'density')
            //     .name('density')
            //     .min(0)
            //     .max(0.1)
            //     .step(0.01)

            // Fog
            this.debugFolder.addColor(this, 'color')
                .onChange(() => {
                    this.scene.fog.color.set(this.color)
                })

            this.debugFolder.add(this.scene.fog, 'far')
                .name('far')
                .min(15)
                .max(35)
                .step(1)
        }
    }

    update() {}
}