import RestAxiosService from "../RestAxiosService";

class DictionaryService {
  static controllerPath = "/locations";
  static getLocations() {
    return RestAxiosService.get(`${DictionaryService.controllerPath}`);
  }

}

export default DictionaryService;
