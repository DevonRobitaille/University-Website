const {
    FindMaterial,
    UserHasAccessThroughTopic,
    StoreFileInTopics
} = require('./Material_DB')

MaterialSearch = async (material_id) => {
    return await FindMaterial(material_id)
}

UserCanAccessMaterialTopic = async (material_id, user_id) => {
    return await UserHasAccessThroughTopic(material_id, user_id)
}

StoreMaterialInTopics = async (section_id, topic_id, filename) => {
    console.log("Inside Service")
    return await StoreFileInTopics(section_id, topic_id, filename)
}

module.exports = {
    MaterialSearch,
    UserCanAccessMaterialTopic,
    StoreMaterialInTopics
}
