import Ghost from './Ghost'
import Simpsons from './Simpsons.js'
import TVScreen from './TVScreen.js'
import Experience from '../Experience.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('groupEnd', (group) => {
            if (group.name === 'base') {
                this.ghosts = []
                this.simpsons = new Simpsons()
                this.tvScreen = new TVScreen()

                this.createGhosts();
            }
        })
    }

    createGhosts() {
        this.ghosts.push(
            new Ghost({
                id: 1,
                getTrajectoryObject: (ghostAngle) => {
                    return {
                        x: Math.cos(ghostAngle) * (3 + Math.sin(ghostAngle * 0.5)),
                        y: Math.sin(ghostAngle),
                        z: Math.sin(ghostAngle) * (3 + Math.sin(ghostAngle * 0.5))
                    }
                }
            }),
            new Ghost({
                id: 2,
                getTrajectoryObject: (ghostAngle) => {
                    return {
                        x: Math.cos(ghostAngle) * (3 + Math.sin(ghostAngle)),
                        y: Math.sin(ghostAngle),
                        z: Math.sin(2 * ghostAngle) / 2 * (3 + Math.sin(ghostAngle))
                    }
                }
            }),
            new Ghost({
                id: 3,
                getTrajectoryObject: (ghostAngle) => {
                    return {
                        x: -Math.cos(ghostAngle) * (2 + Math.sin(ghostAngle * 2.5)),
                        y: Math.sin(ghostAngle + 1),
                        z: -Math.sin(ghostAngle) * (2 + Math.sin(ghostAngle * 2.5))
                    }
                }
            })
        )
    }

    resize() {}

    update() {
        if (this.tvScreen) this.tvScreen.update()
        if (this.simpsons) this.simpsons.update()
        if (this.ghosts) this.ghosts.forEach(ghost => ghost.update())
    }

    destroy() {}
}