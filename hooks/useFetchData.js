const { default: axios } = require("axios");

const { useState, useEffect } = require("react");

function useFetchData(apiEndPoint) {
  const [alldata, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      setLoading(false);
      return;
    }
    setLoading(true);

    const fetchAllData = async () => {
      try {

        const res = await axios.get(apiEndPoint);
        const alldata = res.data;
        setAllData(alldata);
        setLoading(false);

      } catch (err) {
        console.error("failed to fetch all data", err);
        setLoading(false);
      }
    };

    if(apiEndPoint) {
        fetchAllData();
    }
  }, [initialLoad, apiEndPoint]);

  return {alldata, loading}
}


export default useFetchData;