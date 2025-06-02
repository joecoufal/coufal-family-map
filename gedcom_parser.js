class GedcomParser {
    constructor() {
        this.individuals = new Map();
        this.families = new Map();
        this.currentRecord = null;
        this.currentType = null;
    }

    parse(gedcomContent) {
        const lines = gedcomContent.split('\n');
        
        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            const [level, ...rest] = line.split(' ');
            const levelNum = parseInt(level);
            
            if (levelNum === 0) {
                this.handleLevel0(rest.join(' '));
            } else if (this.currentRecord) {
                this.handleSubLevel(levelNum, rest.join(' '));
            }
        }

        return this.buildFamilyTree();
    }

    handleLevel0(data) {
        if (data.startsWith('@I')) {
            // Individual record
            const id = data.split(' ')[0];
            this.currentRecord = { id, type: 'INDI', names: [] };
            this.currentType = 'INDI';
            this.individuals.set(id, this.currentRecord);
        } else if (data.startsWith('@F')) {
            // Family record
            const id = data.split(' ')[0];
            this.currentRecord = { id, type: 'FAM', children: [] };
            this.currentType = 'FAM';
            this.families.set(id, this.currentRecord);
        }
    }

    handleSubLevel(level, data) {
        if (this.currentType === 'INDI') {
            if (data.startsWith('NAME')) {
                const name = data.substring(5).replace(/\//g, '').trim();
                this.currentRecord.names.push(name);
            } else if (data.startsWith('BIRT')) {
                this.currentRecord.birth = {};
            } else if (data.startsWith('DEAT')) {
                this.currentRecord.death = {};
            } else if (data.startsWith('DATE') && (this.currentRecord.birth || this.currentRecord.death)) {
                const date = data.substring(5).trim();
                if (this.currentRecord.birth && !this.currentRecord.birth.date) {
                    this.currentRecord.birth.date = date;
                } else if (this.currentRecord.death && !this.currentRecord.death.date) {
                    this.currentRecord.death.date = date;
                }
            }
        } else if (this.currentType === 'FAM') {
            if (data.startsWith('HUSB')) {
                this.currentRecord.husband = data.split(' ')[1];
            } else if (data.startsWith('WIFE')) {
                this.currentRecord.wife = data.split(' ')[1];
            } else if (data.startsWith('CHIL')) {
                this.currentRecord.children.push(data.split(' ')[1]);
            }
        }
    }

    buildFamilyTree() {
        const tree = {
            families: [],
            individuals: Array.from(this.individuals.values()).map(individual => ({
                id: individual.id,
                name: individual.names[0] || 'Unknown',
                birth: individual.birth?.date,
                death: individual.death?.date
            }))
        };

        for (const [id, family] of this.families) {
            const familyData = {
                id,
                husband: this.individuals.get(family.husband)?.names[0] || 'Unknown',
                wife: this.individuals.get(family.wife)?.names[0] || 'Unknown',
                children: family.children.map(childId => ({
                    id: childId,
                    name: this.individuals.get(childId)?.names[0] || 'Unknown'
                }))
            };
            tree.families.push(familyData);
        }

        return tree;
    }
}